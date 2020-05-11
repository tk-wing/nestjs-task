import { Task } from 'src/entities/task.entity';
import { ITaskModel } from '../task.model';
import { Repository } from 'typeorm';

export abstract class ITaskRepository extends Repository<Task> {
  abstract getTaskById(id: number): Promise<Task>;
  abstract createTask(taskEntity: ITaskModel): Promise<Task>;
  abstract deleteTask(id: number): Promise<void>;
}


