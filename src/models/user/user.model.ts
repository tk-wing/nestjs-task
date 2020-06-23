export interface IUserModel {
  username: string;
  mail: string;
  password: string;
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

export class UserEntity extends UserModel {
  readonly id: number;

  constructor(value: { id: number, username: string; mail: string; password: string }) {
    super(value);
    this.id = value.id;
  }
}
