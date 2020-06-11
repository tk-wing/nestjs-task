import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';


@Injectable()
export class JwtConfig implements JwtOptionsFactory {

  createJwtOptions(): JwtModuleOptions {
    const configService = new ConfigService();
    return {
      secret: configService.get<string>('JWT_SECRET_KEY', 'topSecret'),
      signOptions: {
        expiresIn: configService.get<number>('JWT_EXPIRES_IN', 3600),
      }
    }
  }
}
