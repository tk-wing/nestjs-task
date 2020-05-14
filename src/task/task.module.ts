import { Module } from '@nestjs/common';
import { TaskAppService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule,
  ],
  controllers: [TaskController],
  providers: [
    {
      provide: 'ITaskAppService',
      useClass: TaskAppService
    }
  ],
})
export class TaskModule {}
