import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { UpdateTaskDto } from '@/models/task/dto/update-task.dto';
import { User } from '@/entities/user.entity';
import { ITaskModel, TaskStatus, TaskModel, ITaskEntity } from '@/models/task/task.model';
import { UpdateTaskStatusDto } from '@/models/task/dto/update-task-status.dto';
import { CreateTaskDto } from '@/models/task/dto/create-task.dto';
import { PaginationDto } from '@/models/pagination.dto';
import { ITaskAppService } from '@/models/task/interface/service.interface';
import { Task } from '@/entities/task.entity';
import { ITaskRepository } from '@/models/task/interface/repository.interface';
import { FilterTaskDto } from '@/models/task/dto/filter-task.dto';
import { IUserEntity } from '@/models/user/user.model';
import { List } from '@/entities/list.entity';
import { IListRepository } from '@/models/list/interface/repository.interface';

@Injectable()
export class TaskAppService extends ITaskAppService  {
  constructor (
    @InjectRepository(Task)
    private taskRepository: ITaskRepository,
    @InjectRepository(List)
    private listRepository: IListRepository
    ){
      super();
    }

  async getTask(id: number, user: IUserEntity): Promise<ITaskEntity> {
    return await this.taskRepository.getTask(id, user);
  }

  async getTasks(paginationOptions: PaginationDto, filterTaskDto: FilterTaskDto, user: IUserEntity): Promise<Pagination<ITaskEntity>> {
    return await this.taskRepository.getTasks(paginationOptions, filterTaskDto, user);
  }

  async createTask(request: CreateTaskDto, user: IUserEntity): Promise<ITaskEntity> {
    const {title, description, listId, expiredAt} = request;

    const list = await this.listRepository.getList(listId, user);

    const taskModel = new TaskModel({
      userId:user.id,
      title,
      description,
      listId: list.id,
      expiredAt,
    });

    return await this.taskRepository.createTask(taskModel);
  }

  async updateTask(id: number, request: UpdateTaskDto, user: IUserEntity): Promise<ITaskEntity>{
    const { description, expiredAt} = request;
    const task = await this.getTask(id, user);

    if(description !== undefined){
      task.description = description;
    }

    if(expiredAt !== undefined){
      task.expiredAt = expiredAt;
    }

    return await this.taskRepository.updateTask(task);
  }

  async updateTaskStatus(id: number, request: UpdateTaskStatusDto, user: IUserEntity): Promise<ITaskEntity> {
    const { status } = request;
    const task = await this.getTask(id, user);

    task.status = status;

    if(task.status === TaskStatus.DONE) {
      task.doneAt = new Date();
    }

    return await this.taskRepository.updateTask(task);
  }

  async deleteTask(id: number, user: IUserEntity): Promise<void> {
    await this.taskRepository.deleteTask(id, user);
  }
}
