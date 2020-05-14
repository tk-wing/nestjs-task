import { Injectable } from '@nestjs/common';
import { ITaskRepository } from '../models/task/interface/repository.interface';
import { ITaskAppService } from '../models/task/interface/service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { CreateTaskDto } from '../models/task/dto/create-task.dto';
import { TaskModel, ITaskModel } from '../models/task/task.model';
import { UpdateTaskDto } from '../models/task/dto/update-task.dto';
import { User } from '../entities/user.entity';
import { PaginationDto } from '../models/pagination.dto';
import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class TaskAppService extends ITaskAppService  {
  constructor (
    @InjectRepository(Task)
    private taskRepository: ITaskRepository
    ){
      super();
    }

  async getTask(id: number, user: User): Promise<ITaskModel> {
    return await this.taskRepository.getTask(id, user);
  }

  async getTasks(paginationOptions: PaginationDto, user: User): Promise<Pagination<Task>> {
    return await this.taskRepository.getTasks(paginationOptions, user);
  }

  createTask(request: CreateTaskDto, user: User): Promise<ITaskModel> {
    const {title, description, expiredAt} = request;
    const taskModel = new TaskModel(user.id ,title, description, expiredAt);

    return this.taskRepository.createTask(taskModel);
  }

  async updateTask(id: number, request: UpdateTaskDto, user: User): Promise<ITaskModel>{
    const { description, status, expiredAt} = request;
    const task = await this.taskRepository.getTask(id, user);

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

  async deleteTask(id: number, user: User): Promise<void> {
    await this.taskRepository.deleteTask(id, user);
  }
}
