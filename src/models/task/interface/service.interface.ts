import { IPaginationOption, Pagination } from '@/models/types/pagination';
import { UserEntity } from '@/models/user/user.model';
import { CreateTaskDto } from '@/task/dto/create-task.dto';
import { FilterTaskDto } from '@/task/dto/filter-task.dto';
import { UpdateTaskStatusDto } from '@/task/dto/update-task-status.dto';
import { UpdateTaskDto } from '@/task/dto/update-task.dto';
import { TaskEntity } from '../task.model';

export abstract class ITaskAppService {
  abstract getTask(id: number, user:UserEntity): Promise<TaskEntity>;
  abstract getTasks(paginationOptions: IPaginationOption, filterTaskDto :FilterTaskDto, user:UserEntity): Promise<Pagination<TaskEntity>> ;
  abstract createTask(request: CreateTaskDto, user:UserEntity): Promise<TaskEntity>;
  abstract updateTask(id: number, request: UpdateTaskDto, user:UserEntity): Promise<void>;
  abstract updateTaskStatus(id: number, request: UpdateTaskStatusDto, user:UserEntity): Promise<void>;
  abstract deleteTask(id: number, user:UserEntity): Promise<void>;
}

