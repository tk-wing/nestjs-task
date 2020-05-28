import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IListAppService } from '@/models/list/interface/service.interface';
import { IListRepository } from '@/models/list/interface/repository.interface';
import { List } from '@/entities/list.entity';
import { IListEntity, ListModel, ListService } from '@/models/list/list.model';
import { User } from '@/entities/user.entity';
import { IUpdateListDto, ICreateListDto } from '@/models/list/dto/list.dto';
import { IPaginationResponse, IPaginationOption } from '@/models/types/pagination';

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

    const result = await this.listService.isDuplicate(listModel);

    if(result instanceof Error) {
      const message = result.message;
      throw new ConflictException(message);
    }

    return await this.listRepository.createList(listModel);
  }

  async updateList(id: number, request: IUpdateListDto, user: User): Promise<IListEntity> {
    const { name } = request;
    const list = await this.listRepository.getList(id, user);
    list.name = name;

    const result = await this.listService.isDuplicate(list);

    if(result instanceof Error) {
      const message = result.message;
      throw new ConflictException(message);
    }

    return await this.listRepository.updateList(list);
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
