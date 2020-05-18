import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm-config';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { ListModule } from './list/list.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
    TaskModule,
    AuthModule,
    ListModule,
  ],
})
export class AppModule {}
