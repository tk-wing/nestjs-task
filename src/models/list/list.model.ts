import { ListRepository } from '../../list/list.repository';
import { IListRepository } from '@/models/list/interface/repository.interface';
import { AdvancedConsoleLogger } from 'typeorm';
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

  constructor(value: { userId: number; name: string }) {
    this.userId = value.userId;
    this.name = value.name;
  }
}

export class ListService {
  constructor(private listRepository: IListRepository) {}

  async isExist(listModel: ListModel): Promise<boolean> {
    const condition = { userId: listModel.userId, name: listModel.name };
    return await this.listRepository.isExist(condition);
  }

  async isDelete(listModel: ListModel): Promise<boolean> {
    const condition = { userId: listModel.userId };
    return (await this.listRepository.countList(condition)) > 1;
  }
}
