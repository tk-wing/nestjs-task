import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { ITaskModel } from '../task.model';

export interface ITaskAppService {
  getTask(id: number): Promise<ITaskModel>;
  createTask(request: CreateTaskDto): Promise<ITaskModel>;
  updateTask(id: number, request: UpdateTaskDto): Promise<ITaskModel>;
  deleteTask(id: number): Promise<void>;
}

