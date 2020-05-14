import { Task } from 'src/entities/task.entity';
import { ITaskModel } from '../task.model';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user.entity';
import { IPaginationOptions ,Pagination } from 'nestjs-typeorm-paginate';


export abstract class ITaskRepository extends Repository<Task> {
  abstract getTask(id: number, user: User): Promise<Task>;
  abstract getTasks(paginationOptions: IPaginationOptions, user: User): Promise<Pagination<Task>>;
  abstract createTask(taskModel: ITaskModel): Promise<Task>;
  abstract deleteTask(id: number, user: User): Promise<void>;
}


