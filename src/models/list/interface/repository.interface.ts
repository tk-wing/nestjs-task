import { IListEntity, IListModel } from '@/models/list/list.model';
import { IPaginationOption, IPaginationResponse } from '@/models/types/pagination';
import { IUserEntity } from '@/models/user/user.model';


export interface IListRepository {
  isExist(condition: Partial<IListModel>): Promise<boolean>;
  countListByUserId(userId: number): Promise<number>;
  getList(id: number, user: IUserEntity): Promise<IListEntity>;
  getLists(paginationOptions: IPaginationOption, user: IUserEntity): Promise<IPaginationResponse<IListEntity>>;
  createList(listModel: IListModel): Promise<IListEntity>;
  updateList(list: IListEntity): Promise<IListEntity>;
  deleteList(id: number, user: IUserEntity): Promise<void>;
}
