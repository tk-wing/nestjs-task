import { IDataModel } from '@/models/data.model';
import { UserEntity } from '@/models/user/user.model';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { List } from './list.entity';
import { Task } from './task.entity';

@Entity('users')
export class User extends BaseEntity implements IDataModel<UserEntity>{
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: 'varchar', length: 191, unique: true })
  username!: string;

  @Column({ type: 'varchar', length: 191, unique: true })
  mail!: string;

  @Column({ type: 'varchar', length: 191 })
  password!: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at', nullable: true })
  readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at', nullable: true })
  readonly updatedAt!: Date;

  @OneToMany(
    () => Task,
    task => task.user,
  )
  tasks!: Task[];

  @OneToMany(
    () => List,
    list => list.user,
  )
  lists!: List[];

  public toAppEntity(): UserEntity {
    return new UserEntity({
      id: this.id,
      username: this.username,
      mail: this.mail,
      password: this.password,
    });
  }
}
