import { IUserEntity } from 'src/models/user/user.model';
import { IAuthCredentialsDto, IAuthSignupDto } from '../dto/auth.dto';
import { IAccessToken } from "../jwt";

export abstract class IAuthService {
  abstract signUp(request: IAuthSignupDto): Promise<void>;
  abstract signIn(request: IAuthCredentialsDto): Promise<IAccessToken>
  abstract hash(password: string): Promise<string>;
  abstract validate(password: string, user:IUserEntity):Promise<boolean>;
}
