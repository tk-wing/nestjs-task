import { IListRepository } from './interface/repository.interface';
import { ListModel, ListEntity } from './list.model';

export class ListService {
  constructor(private listRepository: IListRepository) {}

  async isDuplicate(listModel: ListModel): Promise<boolean | Error> {
    const result = await this.listRepository.isExist({
      userId: listModel.userId,
      name: listModel.name,
    });

    if (result) {
      return new Error('List name Already exists');
    }

    return result;
  }

  async isFull(listModel: ListModel) : Promise<boolean | Error> {
    const result = await this.listRepository.countListByUserId(listModel.userId);

    if(result >= 30) {
      return new Error('List is limited to 30')
    }

    return true;
  }

  async isDelete(listEntity: ListEntity): Promise<boolean | Error> {
    const result = await this.listRepository.countListByUserId(listEntity.userId);

    if(result <= 1) {
      return new Error('List needs one at least');
    }

    return true;
  }
}
