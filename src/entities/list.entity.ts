import { IListEntity } from '@/models/list/list.model';
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationCount, UpdateDateColumn } from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';

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

  @ManyToOne(() => User, user => user.lists)
  @JoinColumn({ name: 'user_id'})
  user!: User;

  @OneToMany(() => Task, task => task.list)
  tasks!: Task[];

  @RelationCount('tasks')
  taskCount!: number;

  constructor(userId: number){
    super();
    this.userId = userId;
  }

}


