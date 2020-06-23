import { IUserRepository } from './interface/repository.interface';
import { UserModel } from './user.model';

export class UserService {
  constructor(private userRepository: IUserRepository) {}
  async isDuplicate(userModel: UserModel): Promise<boolean | Error> {

    let result = await this.userRepository.isExist({ username: userModel.username});

    if(result) {
      return new Error('User Name Already exist');
    }

    result = await this.userRepository.isExist({ mail: userModel.mail});

    if(result) {
      return new Error('E-mail Already exist');
    }

    return result;
  }
}
