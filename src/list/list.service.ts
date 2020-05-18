import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IListAppService } from '@/models/list/interface/service.interface';
import { IListRepository } from '@/models/list/interface/repository.interface';
import { List } from '@/entities/list.entity';
import { CreateListDto } from '@/models/list/dto/create-list.dto';
import { IListEntity, ListModel } from '@/models/list/list.model';
import { User } from '@/entities/user.entity';
import { UpdateListDto } from '@/models/list/dto/update-list.dto';
import { PaginationDto } from '@/models/pagination.dto';
import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class ListAppService extends IListAppService {

  constructor(
    @InjectRepository(List)
    private listRepository: IListRepository
  ){
    super();
  }

  async getList(id: number, user: User): Promise<IListEntity> {
    return await this.listRepository.getList(id, user);
  }

  async getLists(paginationOptions: PaginationDto, user: User): Promise<Pagination<IListEntity>> {
    return await this.listRepository.getLists(paginationOptions, user);
  }

  async createList(request: CreateListDto, user: User): Promise<IListEntity> {
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

  async updateList(id: number, request: UpdateListDto, user: User): Promise<IListEntity> {
    const { name } = request;
    const list = await this.listRepository.getList(id, user);
    list.name = name;

    if(await this.listRepository.isExist(list)) {
      throw new ConflictException('List name Already exists');
    }

    return await this.listRepository.updateList(list);
  }

  async deleteList(id: number, user: User): Promise<void> {
    const listCount = await this.listRepository.countList(user);

    if(listCount <= 1) {
      throw new BadRequestException('List needs one at least');
    }

    await this.listRepository.deleteList(id, user);
  }
}