import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';
import { IUserModel } from 'src/models/user/user.model';
import * as bcrypt from 'bcryptjs';


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

  @Column({ type: 'varchar', length: 191})
  salt!: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at', nullable: true})
  readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at', nullable: true})
  readonly updatedAt!: Date;

  async validate(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

}
