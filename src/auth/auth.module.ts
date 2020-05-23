import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '../config/jwt-config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ListRepository } from '@/list/list.repository';
import { IUserRepository } from '@/models/user/interface/repository.interface';
import { UserService } from '@/models/user/user.model';
import { ListModule } from '@/list/list.module';
import { IAuthService } from '@/models/auth/interface/service.interface';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, ListRepository]),
    JwtModule.registerAsync({
      useClass: JwtConfig
    }),
    PassportModule.registerAsync({
      useFactory: () => ({
        defaultStrategy: 'jwt'
      })
    }),
    forwardRef(() =>ListModule),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: IAuthService,
      useClass: AuthService,
    },
    {
      provide: UserService,
      useFactory: (userRepository: IUserRepository) => new UserService(userRepository),
      inject: [UserRepository]
    },
    JwtStrategy,
  ],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
