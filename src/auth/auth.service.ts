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
import { UserModel, IUserModel, UserService } from '@/models/user/user.model';
import { IAccessToken, IJwtPayload } from '@/models/auth/jwt';
import { IListAppService } from '@/models/list/interface/service.interface';
import { IAuthSignupDto, IAuthCredentialsDto } from '@/models/auth/dto/auth.dto';
import * as request from 'supertest';

@Injectable()
export class AuthService extends IAuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: IUserRepository,
    private jwtService: JwtService,
    private userService: UserService,
  ) {
    super();
  }

  async signUp(request: IAuthSignupDto): Promise<void> {
    const { username, mail, password } = request;
    const hashPassword = await this.hash(password);
    const userModel = new UserModel({
      username,
      mail,
      password: hashPassword,
    });

    const result = await this.userService.isDuplicate(userModel);

    if(result instanceof Error) {
      throw new ConflictException(result.message);
    }

    await this.userRepository.createUser(userModel);

  }

  async signIn(request: IAuthCredentialsDto): Promise<IAccessToken> {
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
