
export interface IUserModel {
  username: string;
  mail: string;
  password: string;
}

export class UserModel implements IUserModel {
  username: string;
  mail: string;
  password!: string;

  constructor(username: string, mail: string, password: string) {
    this.username = username;
    this.mail = mail;
    this.password = password;
  }
}

