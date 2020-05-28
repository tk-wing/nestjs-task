import { IUserEntity } from '@/models/user/user.model';
import { ITaskEntity } from '../task.model';
import { CreateTaskDto } from '@/task/dto/create-task.dto';
import { FilterTaskDto } from '@/task/dto/filter-task.dto';
import { UpdateTaskDto } from '@/task/dto/update-task.dto';
import { UpdateTaskStatusDto } from '@/task/dto/update-task-status.dto';
import { IPaginationOption, IPaginationResponse } from '@/models/types/pagination';

export abstract class ITaskAppService {
  abstract getTask(id: number, user:IUserEntity): Promise<ITaskEntity>;
  abstract getTasks(paginationOptions: IPaginationOption, filterTaskDto :FilterTaskDto, user:IUserEntity): Promise<IPaginationResponse<ITaskEntity>> ;
  abstract createTask(request: CreateTaskDto, user:IUserEntity): Promise<ITaskEntity>;
  abstract updateTask(id: number, request: UpdateTaskDto, user:IUserEntity): Promise<ITaskEntity>;
  abstract updateTaskStatus(id: number, request: UpdateTaskStatusDto, user:IUserEntity): Promise<ITaskEntity>;
  abstract deleteTask(id: number, user:IUserEntity): Promise<void>;
}

