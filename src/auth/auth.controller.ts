import { Controller, Post, Body, ValidationPipe, Inject } from '@nestjs/common';
import { IAccessToken } from '@/models/auth/jwt';
import { IAuthService } from '@/models/auth/interface/service.interface';
import { AuthSignupDto } from './dto/auth-signup.dto';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(IAuthService)
    private authService: IAuthService,
  ) {}

  @Post('signup')
  signUp(@Body(ValidationPipe) request: AuthSignupDto): Promise<void> {
    return this.authService.signUp(request);
  }

  @Post('signin')
  signIp(
    @Body(ValidationPipe) request: AuthCredentialsDto,
  ): Promise<IAccessToken> {
    return this.authService.signIn(request);
  }
}
