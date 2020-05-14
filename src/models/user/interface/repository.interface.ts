import { User } from '../../../entities/user.entity';
import { Repository } from 'typeorm';
import { IUserModel } from '../user.model';
import { IJwtPayload } from '../../auth/jwt';


export abstract class IUserRepository extends Repository<User> {
  abstract isExist(user: IUserModel): Promise<boolean>;
  abstract getUser(request: IJwtPayload): Promise<User>;
  abstract createUser(user: IUserModel): Promise<User>;
  // abstract deleteUser(id: number): Promise<void>;
}
