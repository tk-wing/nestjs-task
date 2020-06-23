import { User } from '@/entities/user.entity';
import { IJwtPayload } from '@/models/auth/jwt';
import { IUserRepository } from '@/models/user/interface/repository.interface';
import { IUserModel } from '@/models/user/user.model';
import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../models/user/user.model';

@EntityRepository(User)
export class UserRepository extends Repository<User> implements IUserRepository {

  async getUser(request: IJwtPayload): Promise<UserEntity> {
    const user = await this.findOne({ mail: request.mail});

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.toAppEntity();
  }

  async isExist(condition: Partial<IUserModel>): Promise<boolean> {
    const result = await this.findOne(condition);

    return result !== undefined;
  }

  async createUser(userModel: IUserModel): Promise<UserEntity> {
    const user = new User();
    user.username = userModel.username;
    user.mail = userModel.mail;
    user.password = userModel.password;

    return await (await user.save()).toAppEntity();
  }

}
