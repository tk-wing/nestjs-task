import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const configService = new ConfigService();
    return {
      type: configService.get<'mysql'>('TYPEORM_TYPE', 'mysql'),
      host: configService.get('TYPEORM_HOST', 'localhost'),
      port: Number(configService.get('TYPEORM_PORT', 3306)),
      username: configService.get('TYPEORM_USERNAME', ''),
      password: configService.get('TYPEORM_PASSWORD', ''),
      database: configService.get<string>('TYPEORM_DATABASE', ''),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: configService.get('TYPEORM_SYNCHRONIZE', false),
    }
  }
}
