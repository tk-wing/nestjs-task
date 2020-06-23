import { TaskEntity } from '@/models/task/task.model';
import { IPaginationOption, Pagination } from '@/models/types/pagination';
import { UserEntity } from '@/models/user/user.model';
import { TaskModel } from '../task.model';


export interface ITaskRepository {
  getTask(id: number, user: UserEntity): Promise<TaskEntity>;
  getTasks(paginationOptions: IPaginationOption, condition :Partial<TaskEntity>, user: UserEntity): Promise<Pagination<TaskEntity>>;
  createTask(taskModel: TaskModel): Promise<TaskEntity>;
  deleteTask(id: number, user: UserEntity): Promise<boolean>;
  updateTask(task: TaskEntity): Promise<boolean>;
}


