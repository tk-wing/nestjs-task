export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface ITaskModel {
  readonly userId: number;
  readonly title: string;
  description: string;
  status: TaskStatus;
  expiredAt?: Date;
}

export class TaskModel implements ITaskModel {
  readonly userId: number;
  readonly title: string;
  description: string;
  status: TaskStatus;
  expiredAt ?: Date;

  constructor(
    userId: number,
    title: string,
    description: string,
    expiredAt?: Date,
  ) {
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.status = TaskStatus.OPEN;

    if(expiredAt !== undefined){
      this.expiredAt = expiredAt;
    }
  }
}
