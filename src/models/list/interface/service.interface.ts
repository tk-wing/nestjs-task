import { PaginationDto } from '@/models/pagination.dto';
import { IUserEntity } from '@/models/user/user.model';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateListDto } from '../dto/create-list.dto';
import { UpdateListDto } from '../dto/update-list.dto';
import { IListEntity } from '@/models/list/list.model';

export abstract class IListAppService {
  abstract getList(id: number, user: IUserEntity): Promise<IListEntity>;
  abstract getLists(paginationOptions: PaginationDto,user: IUserEntity): Promise<Pagination<IListEntity>> ;
  abstract createList(request: CreateListDto, user: IUserEntity): Promise<IListEntity>;
  abstract updateList(id: number, request: UpdateListDto, user: IUserEntity): Promise<IListEntity>;
  abstract deleteList(id: number, user: IUserEntity): Promise<void>;
}
