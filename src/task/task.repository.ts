import { EntityRepository, QueryRunner } from 'typeorm';
import { Task } from 'src/entities/task.entity';
import { ITaskRepository } from '../models/task/interface/repository.interface';
import { ITaskModel } from '../models/task/task.model';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';

@EntityRepository(Task)
export class TaskRepository extends ITaskRepository {

  async getTask(id: number, user: User) {
    const task = await this.findOne({ where: { id: id, userId: user.id }});
    if(!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async getTasks(paginationOptions: IPaginationOptions, user: User): Promise<Pagination<Task>> {
    const builder = this.createQueryBuilder();
    builder.orderBy('created_at', 'DESC');

    return await paginate<Task>(builder, paginationOptions);
  }

  async createTask(taskModel: ITaskModel): Promise<Task> {
    const task = new Task(taskModel.userId, taskModel.title);
    task.description = taskModel.description;
    task.status = taskModel.status;

    if(taskModel.expiredAt !== undefined){
      task.expiredAt = taskModel.expiredAt;
    }
    await this.save(task);

    return task;
  }


  async deleteTask(id: number, user: User): Promise<void> {
    await this.softDelete({id: id, userId: user.id });
  }
}
