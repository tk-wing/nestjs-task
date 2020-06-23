import { GetUser } from '@/decorator/get-user.decorator';
import { User } from '@/entities/user.entity';
import { CreateListDto } from '@/list/dto/create-list.dto';
import { UpdateListDto } from '@/list/dto/update-list.dto';
import { IListAppService } from '@/models/list/interface/service.interface';
import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, UseGuards, UsePipes, ValidationPipe, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

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
    @GetUser() user: User,
  ) {
    return this.listAppService.getLists(user);
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
