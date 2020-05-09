export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface ITaskEntity {
  id: number;
  user_id: number;
  title: string;
  description: string;
  status: TaskStatus;
  expiredAt: string;
}

export class TaskEntity implements ITaskEntity {
  id = 0;
  user_id = 0;
  title = '';
  description = '';
  status = TaskStatus.OPEN;
  expiredAt = '';
}
