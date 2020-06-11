import { ITaskEntity } from '@/models/task/task.model';
import { IUserEntity } from '@/models/user/user.model';
import { IPaginationOptions ,Pagination } from 'nestjs-typeorm-paginate';
import { ITaskModel } from '../task.model';


export interface ITaskRepository {
  getTask(id: number, user: IUserEntity): Promise<ITaskEntity>;
  getTasks(paginationOptions: IPaginationOptions, condition :Partial<ITaskEntity>, user: IUserEntity): Promise<Pagination<ITaskEntity>>;
  createTask(taskModel: ITaskModel): Promise<ITaskEntity>;
  deleteTask(id: number, user: IUserEntity): Promise<void>;
  updateTask(task: ITaskEntity): Promise<ITaskEntity>;
}


