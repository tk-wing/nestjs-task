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
    listId: number,
    title: string,
    description?: string,
    expiredAt?: Date,
    doneAt?: Date,
  }) {
    this.userId = value.userId;
    this.listId = value.listId;
    this.title = value.title;
    this.status = TaskStatus.OPEN;

    if(value.description) {
      this.description = value.description;
    }

    if(value.expiredAt) {
      this.expiredAt = value.expiredAt;
    }

    if(value.doneAt) {
      this.doneAt = value.doneAt;
    }
  }
}

export class TaskEntity extends TaskModel {
  readonly id: number

  constructor(value :{
    id: number,
    userId: number,
    listId: number,
    title: string,
    description?: string,
    expiredAt?: Date,
    doneAt?: Date,
  }){
    super(value);
    this.id = value.id;
  }
}
