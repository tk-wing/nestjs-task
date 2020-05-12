import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AuthSignupDto } from '../models/auth/dto/auth-signup.dto';
import { UserModel } from '../models/user/user.model';
import { IAuthService } from 'src/models/auth/interface/service.interface';
import { IUserRepository } from '../models/user/interface/repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from '../models/auth/dto/auth-credential.dto';
import { IJwtPayload, IAccessToken } from '../models/auth/jwt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: IUserRepository,
    private jwtService: JwtService,
  ){}

  async signUp(request: AuthSignupDto):Promise<void> {
    const { username, mail, password } = request;
    const userModel = new UserModel(username, mail, password);

    if(await this.userRepository.isExist(userModel)) {
      throw new ConflictException('E-mail Already exists');
    }

    this.userRepository.createUser(userModel);
  }

  async signIn(request: AuthCredentialsDto): Promise<IAccessToken> {
    const payload: IJwtPayload = { mail: request.mail };
    const user = await this.userRepository.getUser(payload);

    if(!user) {
      throw new NotFoundException(`User not found`);
    }

    if(!await user.validate(request.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
