import { Module } from '@nestjs/common';
import { TaskAppService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
  ],
  controllers: [TaskController],
  providers: [
    {
      provide: 'ITaskAppService',
      useClass: TaskAppService
    }
    // TaskService
  ],
})
export class TaskModule {}
