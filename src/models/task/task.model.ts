export enum TaskStatus {
  OPEN = 'OPEN',
  // IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface ITaskModel {
  readonly userId: number;
  listId: number;
  readonly title: string;
  description: string;
  status: TaskStatus;
  expiredAt: Date;
  doneAt: Date;
}

export interface ITaskEntity extends ITaskModel{
  readonly id: number
}

export class TaskModel implements ITaskModel {
  readonly userId: number;
  listId!: number;
  readonly title: string;
  description!: string;
  status: TaskStatus;
  expiredAt!: Date;
  doneAt!: Date;

  constructor(value :{
    userId: number,
    title: string,
    description?: string,
    listId?: number,
    expiredAt?: Date,
  }) {
    this.userId = value.userId;
    this.title = value.title;
    this.status = TaskStatus.OPEN;

    if(value.description) {
      this.description = value.description;
    }

    if(value.listId) {
      this.listId = value.listId;
    }

    if(value.expiredAt) {
      this.expiredAt = value.expiredAt;
    }
  }
}
