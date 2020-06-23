import { List } from '@/entities/list.entity';
import { User } from '@/entities/user.entity';
import { ICreateListDto, IUpdateListDto } from '@/models/list/dto/list.dto';
import { IListRepository } from '@/models/list/interface/repository.interface';
import { IListAppService } from '@/models/list/interface/service.interface';
import { ListEntity, ListModel } from '@/models/list/list.model';
import { ListService } from '@/models/list/list.service';
import { BadRequestException, ConflictException, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ListAppService extends IListAppService {

  constructor(
    @InjectRepository(List)
    private listRepository: IListRepository,
    private listService: ListService,
  ){
    super();
  }

  async getList(id: number, user: User): Promise<ListEntity> {
    return await this.listRepository.getList(id, user);
  }

  async getLists(user: User): Promise<ListEntity[]> {
    return await this.listRepository.getLists(user);
  }

  async createList(request: ICreateListDto, user: User): Promise<ListEntity> {
    const { name } = request;
    const listModel = new ListModel({
      userId: user.id,
      name: name,
    });

    let result = await this.listService.isDuplicate(listModel);

    if(result instanceof Error) {
      const message = result.message;
      throw new ConflictException(message);
    }

    result = await this.listService.isFull(listModel);

    if(result instanceof Error) {
      const message = result.message;
      throw new BadRequestException(message);
    }

    return await this.listRepository.createList(listModel);
  }

  async updateList(id: number, request: IUpdateListDto, user: User): Promise<void> {
    const { name } = request;
    const listEntity = await this.listRepository.getList(id, user);
    listEntity.name = name;

    const result = await this.listService.isDuplicate(listEntity);

    if(result instanceof Error) {
      const message = result.message;
      throw new ConflictException(message);
    }

    await this.listRepository.updateList(listEntity);
  }

  async deleteList(id: number, user: User): Promise<void> {
    const list = await this.listRepository.getList(id ,user);

    const result = await this.listService.isDelete(list);

    if(result instanceof Error) {
      throw new BadRequestException(result.message);
    }

    await this.listRepository.deleteList(id, user);
  }
}
