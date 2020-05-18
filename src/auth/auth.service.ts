import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { IAuthService } from '@/models/auth/interface/service.interface';
import { UserRepository } from './user.repository';
import { IUserRepository } from '@/models/user/interface/repository.interface';
import { AuthSignupDto } from '@/models/auth/dto/auth-signup.dto';
import { UserModel, IUserModel } from '@/models/user/user.model';
import { AuthCredentialsDto } from '@/models/auth/dto/auth-credential.dto';
import { IAccessToken, IJwtPayload } from '@/models/auth/jwt';
import { ListRepository } from '../list/list.repository';
import { IListRepository } from '@/models/list/interface/repository.interface';
import { ListModel } from '@/models/list/list.model';

@Injectable()
export class AuthService extends IAuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: IUserRepository,
    @InjectRepository(ListRepository)
    private listRepository: IListRepository,
    private jwtService: JwtService,
  ) {
    super();
  }

  async signUp(request: AuthSignupDto): Promise<void> {
    const { username, mail, password } = request;
    const hashPassword = await this.hash(password);
    const userModel = new UserModel({
      username,
      mail,
      password: hashPassword,
    });

    if (await this.userRepository.isExist(userModel)) {
      throw new ConflictException('E-mail Already exists');
    }

    const user = await this.userRepository.createUser(userModel);

    const listModel = new ListModel({
      userId: user.id,
      name: 'My Task'
    });

    await this.listRepository.createList(listModel);
  }

  async signIn(request: AuthCredentialsDto): Promise<IAccessToken> {
    const payload: IJwtPayload = { mail: request.mail };
    const user = await this.userRepository.getUser(payload);

    if (!(await this.validate(request.password, user))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 8);
  }

  async validate(password: string, user: IUserModel): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }
}
