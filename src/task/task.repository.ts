import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';
import { Task } from '@/entities/task.entity';
import { ITaskRepository } from '@/models/task/interface/repository.interface';
import { User } from '@/entities/user.entity';
import { ITaskModel } from '@/models/task/task.model';
import { FilterTaskDto } from '@/models/task/dto/filter-task.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> implements ITaskRepository {

  async getTask(id: number, user: User): Promise<Task> {
    const task = await this.findOne({ where: { id: id, userId: user.id }});
    if(!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async getTasks(paginationOptions: IPaginationOptions, filterTaskDto: FilterTaskDto, user: User): Promise<Pagination<Task>> {
    const builder = this.createQueryBuilder('users');
    builder.where('user_id =:userId', { userId: user.id})
    .orderBy('created_at', 'DESC');

    if(filterTaskDto.listId !== undefined) {
      builder.andWhere('list_id =:listId', { listId: filterTaskDto.listId});;
    }

    return await paginate<Task>(builder, paginationOptions);
  }

  async createTask(taskModel: ITaskModel): Promise<Task> {
    const task = new Task(taskModel.userId, taskModel.title);
    task.listId = taskModel.listId;
    task.description = taskModel.description;
    task.status = taskModel.status;

    if(taskModel.expiredAt !== undefined){
      task.expiredAt = taskModel.expiredAt;
    }
    await this.save(task);

    return task;
  }

  async updateTask(task: Task): Promise<Task> {
    return await this.save(task);
  }

  async deleteTask(id: number, user: User): Promise<void> {
    await this.softDelete({id: id, userId: user.id });
  }
}
