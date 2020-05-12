import { Controller, Post, Body, ValidationPipe, Inject } from '@nestjs/common';
import { AuthSignupDto } from '../models/auth/dto/auth-signup.dto';
import { IAuthService } from 'src/models/auth/interface/service.interface';
import { AuthCredentialsDto } from '../models/auth/dto/auth-credential.dto';
import { IAccessToken } from 'src/models/auth/jwt';

@Controller('auth')
export class AuthController {

  constructor(
    @Inject('IAuthService')
    private authService: IAuthService
  ){}

  @Post('signup')
  signUp(
    @Body(ValidationPipe) request: AuthSignupDto
  ): Promise<void> {
    return this.authService.signUp(request);
  }

  @Post('signin')
  signIp(
    @Body(ValidationPipe) request: AuthCredentialsDto
  ): Promise<IAccessToken> {
    return this.authService.signIn(request);
  }

}
