
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

  constructor(value: {
    username: string,
    mail: string,
    password: string
  }) {
    this.username = value.username;
    this.mail = value.mail;
    this.password = value.password;
  }
}

