import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDto } from '@/models/pagination.dto';
import { UpdateTaskStatusDto } from '../dto/update-task-status.dto';
import { FilterTaskDto } from '@/models/task/dto/filter-task.dto';
import { IUserEntity } from '@/models/user/user.model';
import { ITaskEntity } from '../task.model';

export abstract class ITaskAppService {
  abstract getTask(id: number, user:IUserEntity): Promise<ITaskEntity>;
  abstract getTasks(paginationOptions: PaginationDto, filterTaskDto :FilterTaskDto, user:IUserEntity): Promise<Pagination<ITaskEntity>> ;
  abstract createTask(request: CreateTaskDto, user:IUserEntity): Promise<ITaskEntity>;
  abstract updateTask(id: number, request: UpdateTaskDto, user:IUserEntity): Promise<ITaskEntity>;
  abstract updateTaskStatus(id: number, request: UpdateTaskStatusDto, user:IUserEntity): Promise<ITaskEntity>;
  abstract deleteTask(id: number, user:IUserEntity): Promise<void>;
}

