import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const configService = new ConfigService();

    return {
      type: configService.get<'mysql'>('TYPEORM_TYPE', 'mysql'),
      host: configService.get<string>('TYPEORM_HOST', 'localhost'),
      port: Number(configService.get<number>('TYPEORM_PORT', 3306)),
      username: configService.get<string>('TYPEORM_USERNAME', ''),
      password: configService.get<string>('TYPEORM_PASSWORD', ''),
      database: configService.get<string>('TYPEORM_DATABASE', ''),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: false,
    }
  }
}
