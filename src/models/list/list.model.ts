export interface IListModel {
  readonly userId: number;
  name: string;
}

export interface IListEntity extends IListModel {
  readonly id: number;
}

export class ListModel implements IListModel {
  readonly userId: number;
  name: string;

  constructor(value: { userId: number, name: string }) {
    this.userId = value.userId;
    this.name = value.name;
  }
}
