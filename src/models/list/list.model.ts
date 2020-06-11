import { IListRepository } from '@/models/list/interface/repository.interface';
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

  async isDuplicate(listModel: ListModel): Promise<boolean | Error> {
    const result = await this.listRepository.isExist({
      userId: listModel.userId,
      name: listModel.name,
    });

    if (!result) {
      return new Error('List name Already exists');
    }

    return result;
  }

  async isDelete(listModel: ListModel): Promise<boolean | Error> {
    const result = await this.listRepository.countListByUserId(listModel.userId);

    if(result > 1) {
      return new Error('List needs one at least');
    }

    return true;
  }
}
