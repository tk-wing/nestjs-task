import Service from "../service";


export interface IUserModel {
  username: string;
  mail: string;
  password: string;
  salt: string;
}

export class UserModel implements IUserModel {
  username = '';
  mail = '';
  password = '';
  salt = '';
}

export class UserService extends Service<IUserModel> {
  async isExist(user: IUserModel): Promise<boolean> {
    const result = this.repository.findOne({ username: user.username});

    return result !== undefined;
  }
}

