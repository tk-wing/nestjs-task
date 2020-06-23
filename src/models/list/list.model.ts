export interface IListModel {
  readonly userId: number;
  name: string;
}

export class ListModel implements IListModel {
  readonly userId: number;
  name: string;

  constructor(value: { userId: number; name: string }) {
    this.userId = value.userId;
    this.name = value.name;
  }
}

export class ListEntity extends ListModel {
  readonly id: number;

  taskCount = 0;

  constructor(value: { id: number, userId: number; name: string }) {
    super(value);
    this.id = value.id;
  }

}


