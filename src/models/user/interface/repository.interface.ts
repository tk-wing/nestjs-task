import { User } from '../../../entities/user.entity';
import { IJwtPayload } from '../../auth/jwt';
import { IUserModel } from '../user.model';


export interface IUserRepository {
  isExist(condition: Partial<IUserModel>): Promise<boolean>;
  getUser(request: IJwtPayload): Promise<User>;
  createUser(userModel: IUserModel): Promise<User>;
  // abstract deleteUser(id: number): Promise<void>;
}
