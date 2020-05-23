import { TaskStatus } from '../task.model';

export interface ICreateTaskDto {
  title: string;
  description: string;
  listId: number;
  expiredAt: Date;
}

export interface IUpdateTaskDto {
  description: string;
  listId: number
  expiredAt: Date;
}

export interface IUpdateTaskStatusDto {
  status: TaskStatus
}

export interface IFilterTaskDto {
  listId: number;
}
