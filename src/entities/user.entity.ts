export interface IUserEntity {
  id: number;
  username: string;
  mail: string;
  password: string;
}

export class UserEntity implements IUserEntity {
  id = 0;
  username = '';
  mail = '';
  password = '';
}
