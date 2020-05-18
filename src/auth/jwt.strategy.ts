import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { ConfigService } from '@nestjs/config';
import { IUserRepository } from '@/models/user/interface/repository.interface';
import { IJwtPayload } from '@/models/auth/jwt';
import { User } from '@/entities/user.entity';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: IUserRepository,
    private configService: ConfigService,
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET_KEY', 'topSecret'),
    })
  }

  async validate(payload: IJwtPayload): Promise<User> {
    const user = await this.userRepository.getUser(payload);

    if(!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
