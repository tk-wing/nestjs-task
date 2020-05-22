import { User } from '../../../entities/user.entity';
import { IUserModel } from '../user.model';
import { IJwtPayload } from '../../auth/jwt';


export interface IUserRepository {
  isExist(condition: { mail: string }): Promise<boolean>;
  getUser(request: IJwtPayload): Promise<User>;
  createUser(userModel: IUserModel): Promise<User>;
  // abstract deleteUser(id: number): Promise<void>;
}
