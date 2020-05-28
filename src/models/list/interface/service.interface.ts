import { IUserEntity } from '@/models/user/user.model';
import { IListEntity } from '@/models/list/list.model';
import { ICreateListDto, IUpdateListDto } from '../dto/list.dto';
import { IPaginationOption, IPaginationResponse } from '@/models/types/pagination';

export abstract class IListAppService {
  abstract getList(id: number, user: IUserEntity): Promise<IListEntity>;
  abstract getLists(paginationOptions: IPaginationOption,user: IUserEntity): Promise<IPaginationResponse<IListEntity>> ;
  abstract createList(request: ICreateListDto, user: IUserEntity): Promise<IListEntity>;
  abstract updateList(id: number, request: IUpdateListDto, user: IUserEntity): Promise<IListEntity>;
  abstract deleteList(id: number, user: IUserEntity): Promise<void>;
}
