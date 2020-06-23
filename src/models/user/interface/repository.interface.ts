import { IJwtPayload } from '@/models/auth/jwt';
import { UserModel, UserEntity } from '../user.model';
export interface IUserRepository {
  isExist(condition: Partial<UserModel>): Promise<boolean>;
  getUser(request: IJwtPayload): Promise<UserEntity>;
  createUser(userModel: UserModel): Promise<UserEntity>;
  // abstract deleteUser(id: number): Promise<void>;
}
