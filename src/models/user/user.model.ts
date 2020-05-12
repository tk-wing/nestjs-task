import Service from "../service";
import * as bcrypt from 'bcryptjs';


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

  constructor(username: string, mail: string, password: string) {
    this.username = username;
    this.mail = mail;
    this.hash(password);
  }

  private async hash(password: string): Promise<void> {
    this.salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password, this.salt);
  }
}

