import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { ITaskModel } from '../task.model';
import { IUserModel } from 'src/models/user/user.model';
import { PaginationDto } from '../../pagination.dto';
import { Pagination } from 'nestjs-typeorm-paginate';

export abstract class ITaskAppService {
  abstract getTask(id: number, user:IUserModel): Promise<ITaskModel>;
  abstract getTasks(paginationOptions: PaginationDto,user:IUserModel): Promise<Pagination<ITaskModel>> ;
  abstract createTask(request: CreateTaskDto, user:IUserModel): Promise<ITaskModel>;
  abstract updateTask(id: number, request: UpdateTaskDto, user:IUserModel): Promise<ITaskModel>;
  abstract deleteTask(id: number, user:IUserModel): Promise<void>;
}

