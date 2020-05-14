import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from 'typeorm';
import { IUserModel } from 'src/models/user/user.model';
import { Task } from './task.entity';

@Entity('users')
export class User extends BaseEntity implements IUserModel {
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
}
