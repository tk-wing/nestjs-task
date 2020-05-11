import { Injectable } from '@nestjs/common';
import { ITaskRepository } from '../models/task/interface/repository.interface';
import { ITaskAppService } from '../models/task/interface/service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { CreateTaskDto } from '../models/task/dto/create-task.dto';
import { TaskModel, ITaskModel } from '../models/task/task.model';
import { UpdateTaskDto } from '../models/task/dto/update-task.dto';

@Injectable()
export class TaskAppService implements ITaskAppService  {
  constructor (
    @InjectRepository(Task)
    private taskRepository: ITaskRepository
    ){}

  async getTask(id: number): Promise<ITaskModel> {
    return await this.taskRepository.getTaskById(id);
  }

  createTask(request: CreateTaskDto): Promise<ITaskModel> {
    const {title, description, expiredAt} = request;
    const taskEntity = new TaskModel(title, description, expiredAt);
    return this.taskRepository.createTask(taskEntity);
  }

  async updateTask(id: number, request: UpdateTaskDto): Promise<ITaskModel>{
    const { description, status, expiredAt} = request;
    const task = await this.taskRepository.getTaskById(id);

    if(description !== undefined){
      task.description = description;
    }

    if(status !== undefined){
      task.status = status;
    }

    if(expiredAt !== undefined){
      task.expiredAt = expiredAt;
    }

    return await task.save();
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.deleteTask(id);
  }
}
