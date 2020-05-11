import { EntityRepository } from 'typeorm';
import { Task } from 'src/entities/task.entity';
import { ITaskRepository } from '../models/task/interface/repository.interface';
import { ITaskModel } from '../models/task/task.model';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends ITaskRepository {

  async getTaskById(id: number): Promise<Task>{
    const task = await this.findOne({ where: { id }});

    if(!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async createTask(taskEntity: ITaskModel): Promise<Task> {
    const task = new Task(taskEntity.title);
    task.description = taskEntity.description;
    task.status = taskEntity.status;

    if(taskEntity.expiredAt !== undefined){
      task.expiredAt = taskEntity.expiredAt;
    }

    await this.save(task);

    return task;
  }


  async deleteTask(id: number): Promise<void> {
    await this.softDelete({id: id});
  }
}
