import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Timestamp, BaseEntity, ValueTransformer} from "typeorm";
import { ITaskModel, TaskStatus } from '../models/task/task.model';

@Entity('tasks')
export class Task extends BaseEntity implements ITaskModel {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: 'varchar', length: 191})
  readonly title!: string;

  @Column({ type: 'text' })
  description!:string;

  @Column({ type: 'enum', enum: TaskStatus})
  status!: TaskStatus;

  @Column({ type: 'datetime',name: 'expired_at', nullable: true})
  expiredAt!: Date;

  @CreateDateColumn({ type: 'datetime', name: 'created_at', nullable: true})
  readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at', nullable: true})
  readonly updatedAt!: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at', nullable: true})
  readonly deletedAt!: Date;

  constructor(title: string){
    super();
    this.title = title;
  }

}


