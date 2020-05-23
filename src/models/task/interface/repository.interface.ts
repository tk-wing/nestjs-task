import { IPaginationOptions ,Pagination } from 'nestjs-typeorm-paginate';
import { ITaskModel } from '../task.model';
import { FilterTaskDto } from '@/task/dto/filter-task.dto';
import { IUserEntity } from '@/models/user/user.model';
import { ITaskEntity } from '@/models/task/task.model';


export interface ITaskRepository {
  getTask(id: number, user: IUserEntity): Promise<ITaskEntity>;
  getTasks(paginationOptions: IPaginationOptions, filterTaskDto :FilterTaskDto, user: IUserEntity): Promise<Pagination<ITaskEntity>>;
  createTask(taskModel: ITaskModel): Promise<ITaskEntity>;
  deleteTask(id: number, user: IUserEntity): Promise<void>;
  updateTask(task: ITaskEntity): Promise<ITaskEntity>;
}


