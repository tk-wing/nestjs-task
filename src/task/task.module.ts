import { AuthModule } from '@/auth/auth.module';
import { ListRepository } from '@/list/list.repository';
import { ITaskAppService } from '@/models/task/interface/service.interface';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { TaskAppService } from './task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository, ListRepository]),
    AuthModule,
  ],
  controllers: [TaskController],
  providers: [
    {
      provide: ITaskAppService,
      useClass: TaskAppService
    }
  ],
})
export class TaskModule {}
