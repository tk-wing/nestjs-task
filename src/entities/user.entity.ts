import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from 'typeorm';
import { Task } from './task.entity';
import { List } from './list.entity';
import { IUserEntity } from '@/models/user/user.model';

@Entity('users')
export class User extends BaseEntity implements IUserEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: 'varchar', length: 191})
  username!: string;

  @Column({ type: 'varchar', length: 191, unique: true})
  mail!: string;

  @Column({ type: 'varchar', length: 191})
  password!: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at', nullable: true})
  readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at', nullable: true})
  readonly updatedAt!: Date;

  @OneToMany(type => Task, task => task.user)
  tasks!: Task[];

  @OneToMany(type => List, list => list.user)
  lists!: List[];
}
