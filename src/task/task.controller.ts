import { Controller, Post, Inject, Body, Delete, Param, ParseIntPipe, Get, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { ITaskAppService } from '../models/task/interface/service.interface';
import { CreateTaskDto } from '../models/task/dto/create-task.dto';
import { UpdateTaskDto } from '../models/task/dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(
    @Inject('ITaskAppService')
    private taskAppService: ITaskAppService,
  ){}

  @Get('/:id')
  show(
    @Param('id', ParseIntPipe) id: number,
  ){
    return this.taskAppService.getTask(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() request: CreateTaskDto) {
    return this.taskAppService.createTask(request);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateTaskDto,
  ){
    return this.taskAppService.updateTask(id, request);
  }

  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id: number
  ){
    return this.taskAppService.deleteTask(id);
  }

}
