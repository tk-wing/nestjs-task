import { IUserRepository } from '../models/user/interface/repository.interface';
import { EntityRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { IUserModel } from 'src/models/user/user.model';
import { NotFoundException } from '@nestjs/common';
import { IJwtPayload } from 'src/models/auth/jwt';

@EntityRepository(User)
export class UserRepository extends IUserRepository {

  async getUser(request: IJwtPayload): Promise<User | undefined> {
    const user = await this.findOne({ mail: request.mail});

    return user;
  }

  async isExist(userModel: IUserModel): Promise<boolean> {
    const result = await this.findOne({ mail: userModel.mail});

    return result !== undefined;
  }

  async createUser(userModel: IUserModel): Promise<User> {
    const user = new User();
    user.username = userModel.username;
    user.mail = userModel.mail;
    user.password = userModel.password;
    user.salt = userModel.salt;

    return await user.save();
  }

}
