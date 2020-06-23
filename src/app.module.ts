import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfig } from './config/typeorm-config';
import { ListModule } from './list/list.module';
import { TaskModule } from './task/task.module';

let envPath = '.env';

if(process.env.NODE_ENV === 'test') {
  envPath = '.test.env';
}
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envPath,
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
