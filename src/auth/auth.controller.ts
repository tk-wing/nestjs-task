import { IAuthService } from '@/models/auth/interface/service.interface';
import { IAccessToken } from '@/models/auth/jwt';
import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthSignupDto } from './dto/auth-signup.dto';
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
