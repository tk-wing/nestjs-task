import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { IListModel, IListEntity } from '@/models/list/list.model';
import { IUserEntity } from '@/models/user/user.model';

export interface IListRepository {
  isExist(condition: { userId: number, name: string }): Promise<boolean>;
  countList(condition: { userId: number }): Promise<number>;
  getList(id: number, user: IUserEntity): Promise<IListEntity>;
  getLists(paginationOptions: IPaginationOptions, user: IUserEntity): Promise<Pagination<IListEntity>>;
  createList(listModel: IListModel): Promise<IListEntity>;
  updateList(list: IListEntity): Promise<IListEntity>;
  deleteList(id: number, user: IUserEntity): Promise<void>;
}
