import { ListEntity } from '@/models/list/list.model';
import { UserEntity } from '@/models/user/user.model';
import { ICreateListDto, IUpdateListDto } from '../dto/list.dto';

export abstract class IListAppService {
  abstract getList(id: number, user: UserEntity): Promise<ListEntity>;
  abstract getLists(user: UserEntity): Promise<ListEntity[]>;
  abstract createList(request: ICreateListDto, user: UserEntity): Promise<ListEntity>;
  abstract updateList(id: number, request: IUpdateListDto, user: UserEntity): Promise<void>;
  abstract deleteList(id: number, user: UserEntity): Promise<void>;
}
