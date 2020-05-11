import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IUserModel } from 'src/models/user/user.model';


@Entity('users')
export class User extends BaseEntity implements IUserModel {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: 'varchar', length: 191})
  username!: string;

  @Column({ type: 'varchar', length: 191})
  mail!: string;

  @Column({ type: 'varchar', length: 191})
  password!: string;

  @Column({ type: 'varchar', length: 191})
  salt!: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at', nullable: true})
  readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at', nullable: true})
  readonly updatedAt!: Date;

}
