import { IUserRepository } from './interface/repository.interface';

export interface IUserModel {
  username: string;
  mail: string;
  password: string;
}

export interface IUserEntity extends IUserModel {
  readonly id: number;
}

export class UserModel implements IUserModel {
  username: string;
  mail: string;
  password!: string;

  constructor(value: { username: string; mail: string; password: string }) {
    this.username = value.username;
    this.mail = value.mail;
    this.password = value.password;
  }
}

export class UserService {
  constructor(private userRepository: IUserRepository) {}
  async isDuplicate(userModel: UserModel): Promise<boolean | Error> {

    let result = await this.userRepository.isExist({ username: userModel.username});

    if(!result) {
      return new Error('User Name Already exist');
    }

    result = await this.userRepository.isExist({ mail: userModel.mail});

    if(!result) {
      return new Error('E-mail Already exist');
    }

    return result;
  }
}
