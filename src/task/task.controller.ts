import {
  Controller,
  Post,
  Inject,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  Get,
  Patch,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ITaskAppService } from '../models/task/interface/service.interface';
import { CreateTaskDto } from '../models/task/dto/create-task.dto';
import { UpdateTaskDto } from '../models/task/dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorator/get-user.decorator';
import { User } from '../entities/user.entity';
import { PaginationDto } from '../models/pagination.dto';
import { isNumber } from 'util';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(
    @Inject('ITaskAppService')
    private taskAppService: ITaskAppService,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  index(
    @Query() paginationOptions: PaginationDto,
    @GetUser() user: User
    ) {
    return this.taskAppService.getTasks(paginationOptions, user);
  }

  @Get('/:id')
  show(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.taskAppService.getTask(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() request: CreateTaskDto, @GetUser() user: User) {
    return this.taskAppService.createTask(request, user);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateTaskDto,
    @GetUser() user: User,
  ) {
    return this.taskAppService.updateTask(id, request, user);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.taskAppService.deleteTask(id, user);
  }
}
