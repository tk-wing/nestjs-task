import { ListEntity, ListModel } from '@/models/list/list.model';
import { UserEntity } from '@/models/user/user.model';


export interface IListRepository {
  isExist(condition: Partial<ListModel>): Promise<boolean>;
  countListByUserId(userId: number): Promise<number>;
  getList(id: number, user: UserEntity): Promise<ListEntity>;
  getLists(user: UserEntity): Promise<ListEntity[]>;
  createList(listModel: ListModel): Promise<ListEntity>;
  updateList(list: ListEntity): Promise<boolean>;
  deleteList(id: number, user: UserEntity): Promise<boolean>;
}
