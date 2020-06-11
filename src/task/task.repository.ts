import { Task } from '@/entities/task.entity';
import { User } from '@/entities/user.entity';
import { ITaskRepository } from '@/models/task/interface/repository.interface';
import { ITaskModel, ITaskEntity } from '@/models/task/task.model';
import { NotFoundException } from '@nestjs/common';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository } from 'typeorm';


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> implements ITaskRepository {

  async getTask(id: number, user: User): Promise<Task> {
    const task = await this.findOne({ where: { id: id, userId: user.id }});
    if(!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async getTasks(paginationOptions: IPaginationOptions, condition: Partial<ITaskEntity>, user: User): Promise<Pagination<Task>> {
    const builder = this.createQueryBuilder('users');
    builder.where('user_id =:userId', { userId: user.id})
    .orderBy('created_at', 'DESC');

    if(condition.listId !== undefined) {
      builder.andWhere('list_id =:listId', { listId: condition.listId});;
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
