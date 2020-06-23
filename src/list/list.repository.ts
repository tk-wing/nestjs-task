import { List } from '@/entities/list.entity';
import { User } from '@/entities/user.entity';
import { IListRepository } from '@/models/list/interface/repository.interface';
import { ListModel, ListEntity } from '@/models/list/list.model';
import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(List)
export class ListRepository extends Repository<List>
  implements IListRepository {
  async isExist(condition: Partial<ListModel>): Promise<boolean> {
    const list = await this.findOne(condition);

    return list !== undefined;
  }

  async countListByUserId(userId: number): Promise<number> {
    return await this.createQueryBuilder('lists')
      .where('user_id =:userId', { userId })
      .getCount();
  }

  async getList(id: number, user: User): Promise<ListEntity> {
    const list = await this.findOne({ id: id, userId: user.id });

    if (!list) {
      throw new NotFoundException('List not found');
    }

    return list.toAppEntity();
  }

  async getLists(user: User): Promise<ListEntity[]> {
    const builder = this.createQueryBuilder('lists');
    builder
      .where('user_id =:userId', { userId: user.id })
      .orderBy('created_at', 'DESC');

    const lists = await this.find({ userId: user.id });

    const listEntities = lists.map<ListEntity>(function(list) {
      return list.toAppEntity();
    });

    return listEntities
  }

  async createList(listModel: ListModel): Promise<ListEntity> {
    const list = new List(listModel.userId);
    list.name = listModel.name;

    return (await this.save(list)).toAppEntity();
  }

  async updateList(listEntity: ListEntity): Promise<boolean> {
    const result = await this.update(
      { id: listEntity.id, userId: listEntity.userId },
      { name: listEntity.name }
    );

    return result.raw.affectedRows > 0;
  }

  async deleteList(id: number, user: User): Promise<boolean> {
    const result = await this.softDelete({ id: id, userId: user.id });

    return result.raw.affectedRows > 0;
  }
}
