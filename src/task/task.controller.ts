import { GetUser } from '@/decorator/get-user.decorator';
import { User } from '@/entities/user.entity';
import { ITaskAppService } from '@/models/task/interface/service.interface';
import { PaginationDto } from '@/provider/pagination/pagination.dto';
import { CreateTaskDto } from '@/task/dto/create-task.dto';
import { FilterTaskDto } from '@/task/dto/filter-task.dto';
import { UpdateTaskStatusDto } from '@/task/dto/update-task-status.dto';
import { UpdateTaskDto } from '@/task/dto/update-task.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(
    @Inject(ITaskAppService)
    private taskAppService: ITaskAppService,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  index(
    @Query() paginationOptions: PaginationDto,
    @Body() filterTaskDto: FilterTaskDto,
    @GetUser() user: User
    ) {
    return this.taskAppService.getTasks(paginationOptions, filterTaskDto, user);
  }

  @Get('/:id')
  show(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.taskAppService.getTask(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() request: CreateTaskDto, @GetUser() user: User) {
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

  @Patch('/:id/status')
  @UsePipes(ValidationPipe)
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateTaskStatusDto,
    @GetUser() user: User,
  ){
    return this.taskAppService.updateTaskStatus(id, request, user);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.taskAppService.deleteTask(id, user);
  }
}
