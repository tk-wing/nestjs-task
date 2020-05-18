import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany, RelationCount } from 'typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';
import { IListEntity } from '@/models/list/list.model';

@Entity('lists')
export class List extends BaseEntity implements IListEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: 'int', name: 'user_id', unsigned: true})
  readonly userId!: number;

  @Column({ type: 'varchar', length: 191})
  name!: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at', nullable: true})
  readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at', nullable: true})
  readonly updatedAt!: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at', nullable: true})
  readonly deletedAt!: Date;

  @ManyToOne(type => User, user => user.lists)
  @JoinColumn({ name: 'user_id'})
  user!: User;

  @OneToMany(type => Task, task => task.list)
  tasks!: Task[];

  @RelationCount('tasks')
  taskCount!: number;

  constructor(userId: number){
    super();
    this.userId = userId;
  }

}


