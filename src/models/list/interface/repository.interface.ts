import { IListModel, IListEntity } from '@/models/list/list.model';
import { IUserEntity } from '@/models/user/user.model';
import { IPaginationOption, IPaginationResponse } from '@/models/pagination';

export interface IListRepository {
  isExist(condition: { userId: number, name: string }): Promise<boolean>;
  countList(condition: { userId: number }): Promise<number>;
  getList(id: number, user: IUserEntity): Promise<IListEntity>;
  getLists(paginationOptions: IPaginationOption, user: IUserEntity): Promise<IPaginationResponse<IListEntity>>;
  createList(listModel: IListModel): Promise<IListEntity>;
  updateList(list: IListEntity): Promise<IListEntity>;
  deleteList(id: number, user: IUserEntity): Promise<void>;
}
