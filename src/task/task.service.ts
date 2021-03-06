import { List } from '@/entities/list.entity';
import { Task } from '@/entities/task.entity';
import { IListRepository } from '@/models/list/interface/repository.interface';
import { ICreateTaskDto, IFilterTaskDto, IUpdateTaskDto, IUpdateTaskStatusDto } from '@/models/task/dto/task.dto';
import { ITaskRepository } from '@/models/task/interface/repository.interface';
import { ITaskAppService } from '@/models/task/interface/service.interface';
import { ITaskEntity, TaskModel, TaskStatus } from '@/models/task/task.model';
import { IPaginationOption, IPaginationResponse } from '@/models/types/pagination';
import { IUserEntity } from '@/models/user/user.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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

  async getTasks(paginationOptions: IPaginationOption, filterTaskDto: IFilterTaskDto, user: IUserEntity): Promise<IPaginationResponse<ITaskEntity>> {
    return await this.taskRepository.getTasks(paginationOptions, filterTaskDto, user);
  }

  async createTask(request: ICreateTaskDto, user: IUserEntity): Promise<ITaskEntity> {
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

  async updateTask(id: number, request: IUpdateTaskDto, user: IUserEntity): Promise<ITaskEntity>{
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

  async updateTaskStatus(id: number, request: IUpdateTaskStatusDto, user: IUserEntity): Promise<ITaskEntity> {
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
