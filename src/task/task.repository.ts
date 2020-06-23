import { Task } from '@/entities/task.entity';
import { User } from '@/entities/user.entity';
import { ITaskRepository } from '@/models/task/interface/repository.interface';
import { TaskModel, TaskEntity } from '@/models/task/task.model';
import { IPaginationOption, Pagination } from '@/models/types/pagination';
import { NotFoundException } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>
  implements ITaskRepository {
  async getTask(id: number, user: User): Promise<TaskEntity> {
    const task = await this.findOne({ where: { id: id, userId: user.id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task.toAppEntity();
  }

  async getTasks(
    paginationOptions: IPaginationOption,
    condition: Partial<TaskEntity>,
    user: User,
  ): Promise<Pagination<TaskEntity>> {
    const builder = this.createQueryBuilder('users');
    builder
      .where('user_id =:userId', { userId: user.id })
      .orderBy('created_at', 'DESC');

    if (condition.listId !== undefined) {
      builder.andWhere('list_id =:listId', { listId: condition.listId });
    }

    const data = await paginate<Task>(builder, paginationOptions);
    const pagination = new Pagination<TaskEntity>();
    pagination.setMetaData(data.meta);
    pagination.items = data.items.map<TaskEntity>(task => task.toAppEntity());

    return pagination;
  }

  async createTask(taskModel: TaskModel): Promise<TaskEntity> {
    const task = new Task(taskModel.userId, taskModel.title);
    task.listId = taskModel.listId;
    task.description = taskModel.description;
    task.status = taskModel.status;

    if (taskModel.expiredAt !== undefined) {
      task.expiredAt = taskModel.expiredAt;
    }
    await this.save(task);

    return task;
  }

  async updateTask(taskEntity: TaskEntity): Promise<boolean> {
    const result = await this.update(
      { id: taskEntity.id, userId: taskEntity.userId },
      {
        description: taskEntity.description,
        status: taskEntity.status,
        expiredAt: taskEntity.expiredAt,
      },
    );

    return result.raw.affectedRows > 0;
  }

  async deleteTask(id: number, user: User): Promise<boolean> {
    const result = await this.softDelete({ id: id, userId: user.id });

    return result.raw.affectedRows > 0;
  }
}
