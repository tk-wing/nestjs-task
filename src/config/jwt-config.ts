import { Injectable } from "@nestjs/common";
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


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
