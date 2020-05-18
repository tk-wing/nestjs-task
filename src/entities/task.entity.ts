import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity } from "typeorm";
import { User } from "./user.entity";
import { List } from './list.entity';
import { TaskStatus, ITaskEntity } from '@/models/task/task.model';

@Entity('tasks')
export class Task extends BaseEntity implements ITaskEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: 'int', name: 'user_id', unsigned: true})
  readonly userId!: number;

  @Column({ type: 'int', name: 'list_id', unsigned: true})
  listId!: number;

  @Column({ type: 'varchar', length: 191})
  readonly title!: string;

  @Column({ type: 'text', nullable: true})
  description!:string;

  @Column({ type: 'enum', enum: TaskStatus})
  status!: TaskStatus;

  @Column({ type: 'datetime',name: 'expired_at', nullable: true})
  expiredAt!: Date;

  @Column({ type: 'datetime',name: 'done_at', nullable: true})
  doneAt!: Date;

  @CreateDateColumn({ type: 'datetime', name: 'created_at', nullable: true})
  readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at', nullable: true})
  readonly updatedAt!: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at', nullable: true})
  readonly deletedAt!: Date;

  @ManyToOne(type => User, user => user.tasks)
  @JoinColumn({ name: 'user_id'})
  user!: User;

  @ManyToOne(type => List, list => list.tasks)
  @JoinColumn({ name: 'list_id'})
  list!: List;

  constructor(userId: number, title: string){
    super();
    this.userId = userId;
    this.title = title;
  }

}


