import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { User } from '@/entities/user.entity';
import { IUserRepository } from '@/models/user/interface/repository.interface';
import { IJwtPayload } from '@/models/auth/jwt';
import { IUserModel } from '@/models/user/user.model';

@EntityRepository(User)
export class UserRepository extends Repository<User> implements IUserRepository {

  async getUser(request: IJwtPayload): Promise<User> {
    const user = await this.findOne({ mail: request.mail});

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async isExist(condition: Partial<IUserModel>): Promise<boolean> {
    const result = await this.findOne(condition);

    return result !== undefined;
  }

  async createUser(userModel: IUserModel): Promise<User> {
    const user = new User();
    user.username = userModel.username;
    user.mail = userModel.mail;
    user.password = userModel.password;

    return await user.save();
  }

}
