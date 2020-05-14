import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '../config/jwt-config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.registerAsync({
      useClass: JwtConfig
    }),
    PassportModule.registerAsync({
      useFactory: () => ({
        defaultStrategy: 'jwt'
      })
    })
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'IAuthService',
      useClass: AuthService
    },
    JwtStrategy,
  ],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}