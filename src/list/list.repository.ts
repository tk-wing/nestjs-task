import { List } from '@/entities/list.entity';
import { User } from '@/entities/user.entity';
import { IListRepository } from '@/models/list/interface/repository.interface';
import { IListModel } from '@/models/list/list.model';
import { NotFoundException } from '@nestjs/common';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(List)
export class ListRepository extends Repository<List>

  implements IListRepository {
  async isExist(condition: Partial<IListModel>): Promise<boolean> {
    const list = await this.findOne(condition);

    return list !== undefined;
  }

  async countListByUserId(userId: number): Promise<number> {
    return await this.createQueryBuilder('lists')
      .where('user_id =:userId', { userId })
      .getCount();
  }

  async getList(id: number, user: User): Promise<List> {
    const list = await this.findOne({ id: id, userId: user.id });

    if (!list) {
      throw new NotFoundException('List not found');
    }

    return list;
  }

  async getLists(
    paginationOptions: IPaginationOptions,
    user: User,
  ): Promise<Pagination<List>> {
    const builder = this.createQueryBuilder('lists');
    builder
      .where('user_id =:userId', { userId: user.id })
      .orderBy('created_at', 'DESC');

    return await paginate<List>(builder, paginationOptions);
  }

  async createList(listModel: IListModel): Promise<List> {
    const list = new List(listModel.userId);
    list.name = listModel.name;

    return await this.save(list);
  }

  async updateList(list: List): Promise<List> {
    return await this.save(list);
  }

  async deleteList(id: number, user: User): Promise<void> {
    await this.softDelete({ id: id, userId: user.id });
  }
}
