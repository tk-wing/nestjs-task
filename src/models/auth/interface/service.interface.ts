import { IAccessToken } from "../jwt";
import { AuthSignupDto } from '../dto/auth-signup.dto';
import { AuthCredentialsDto } from '../dto/auth-credential.dto';
import { IUserModel } from 'src/models/user/user.model';

export abstract class IAuthService {
  abstract signUp(request: AuthSignupDto): Promise<void>;
  abstract signIn(request: AuthCredentialsDto): Promise<IAccessToken>
  abstract hash(password: string): Promise<string>;
  abstract validate(password: string, user:IUserModel):Promise<boolean>;
}
