import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IListAppService } from '@/models/list/interface/service.interface';
import { IListRepository } from '@/models/list/interface/repository.interface';
import { List } from '@/entities/list.entity';
import { IListEntity, ListModel, ListService } from '@/models/list/list.model';
import { User } from '@/entities/user.entity';
import { PaginationDto } from '@/provider/pagination/pagination.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { IUpdateListDto, ICreateListDto } from '@/models/list/dto/list.dto';
import { IPaginationResponse, IPaginationOption } from '@/models/pagination';

@Injectable()
export class ListAppService extends IListAppService {

  constructor(
    @InjectRepository(List)
    private listRepository: IListRepository,
    private listService: ListService,
  ){
    super();
  }

  async getList(id: number, user: User): Promise<IListEntity> {
    return await this.listRepository.getList(id, user);
  }

  async getLists(paginationOptions: IPaginationOption, user: User): Promise<IPaginationResponse<IListEntity>> {
    return await this.listRepository.getLists(paginationOptions, user);
  }

  async createList(request: ICreateListDto, user: User): Promise<IListEntity> {
    const { name } = request;
    const listModel = new ListModel({
      userId: user.id,
      name: name,
    });

    if(await this.listRepository.isExist(listModel)) {
      throw new ConflictException('List name Already exists');
    }

    return await this.listRepository.createList(listModel);
  }

  async updateList(id: number, request: IUpdateListDto, user: User): Promise<IListEntity> {
    const { name } = request;
    const list = await this.listRepository.getList(id, user);
    list.name = name;

    if(await this.listService.isExist(list)) {
      throw new ConflictException('List name Already exists');
    }

    return await this.listRepository.updateList(list);
  }

  async deleteList(id: number, user: User): Promise<void> {
    const list = await this.listRepository.getList(id ,user);

    if(! await this.listService.isDelete(list)) {
      throw new BadRequestException('List needs one at least');
    }

    await this.listRepository.deleteList(id, user);
  }
}
