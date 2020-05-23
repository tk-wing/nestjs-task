import { IAccessToken } from "../jwt";
import { IUserModel } from 'src/models/user/user.model';
import { IAuthSignupDto, IAuthCredentialsDto } from '../dto/auth.dto';

export abstract class IAuthService {
  abstract signUp(request: IAuthSignupDto): Promise<void>;
  abstract signIn(request: IAuthCredentialsDto): Promise<IAccessToken>
  abstract hash(password: string): Promise<string>;
  abstract validate(password: string, user:IUserModel):Promise<boolean>;
}
