import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthSignupDto } from '../models/auth/dto/auth-signup.dto';
import { UserModel } from '../models/user/user.model';
import { IAuthService } from 'src/models/auth/interface/service.interface';
import { IUserRepository } from '../models/user/interface/repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from '../models/auth/dto/auth-credential.dto';
import { IJwtPayload, IAccessToken } from '../models/auth/jwt';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { IUserModel } from 'src/models/user/user.model';

@Injectable()
export class AuthService extends IAuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {
    super();
  }

  async signUp(request: AuthSignupDto): Promise<void> {
    const { username, mail, password } = request;
    const hashPassword = await this.hash(password);
    const userModel = new UserModel(username, mail, hashPassword);

    if (await this.userRepository.isExist(userModel)) {
      throw new ConflictException('E-mail Already exists');
    }

    this.userRepository.createUser(userModel);
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
