export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface ITaskModel {
  readonly title: string;
  description: string;
  status: TaskStatus;
  expiredAt?: Date;
}

export class TaskModel implements ITaskModel {
  readonly title: string;
  description: string;
  status: TaskStatus;
  expiredAt ?: Date;

  constructor(
    title: string,
    description: string,
    expiredAt?: Date,
  ) {
    this.title = title;
    this.description = description;
    this.status = TaskStatus.OPEN;

    if(expiredAt !== undefined){
      this.expiredAt = expiredAt;
    }
  }
}
