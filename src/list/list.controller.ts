import { Controller, UseGuards, Post, ValidationPipe, UsePipes, Body, Inject, Get, Query, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '@/decorator/get-user.decorator';
import { CreateListDto } from '@/list/dto/create-list.dto';
import { User } from '@/entities/user.entity';
import { IListAppService } from '@/models/list/interface/service.interface';
import { UpdateListDto } from '@/list/dto/update-list.dto';
import { PaginationDto } from '@/provider/pagination/pagination.dto';

@Controller('list')
@UseGuards(AuthGuard())
export class ListController {

  constructor(
    @Inject(IListAppService)
    private listAppService: IListAppService
  ){}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true}))
  async index(
    @Query() paginationOptions: PaginationDto,
    @GetUser() user: User,
  ) {
    return this.listAppService.getLists(paginationOptions, user);
  }

  @Get('/:id')
  async show(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    return this.listAppService.getList(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() request: CreateListDto,
    @GetUser() user: User,
  ){
    return this.listAppService.createList(request, user);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateListDto,
    @GetUser() user: User,
  ) {
    return this.listAppService.updateList(id, request, user);
  }

  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    return this.listAppService.deleteList(id, user);
  }
}
