import { IAccessToken } from "../jwt";
import { AuthSignupDto } from '../dto/auth-signup.dto';
import { AuthCredentialsDto } from '../dto/auth-credential.dto';

export interface IAuthService {
  signUp(request: AuthSignupDto): Promise<void>;
  signIn(request: AuthCredentialsDto): Promise<IAccessToken>
}
