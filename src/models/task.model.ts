import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";
import { ITaskEntity, TaskStatus } from '../entities/task.entity';

@Entity('tasks')
export class Task implements ITaskEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  readonly title!: string;

  @Column()
  description!:string;

  @Column()
  status!: TaskStatus;

  @Column({ name: 'expired_at' })
  expiredAt!: Date;

  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  readonly updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at'})
  readonly deletedAt!: Date;

  // constructor(userId: number){
  //   this.userId = userId;
  // }
}
