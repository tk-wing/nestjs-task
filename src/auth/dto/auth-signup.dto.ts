import { IAuthSignupDto } from '@/models/auth/dto/auth.dto';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthSignupDto implements IAuthSignupDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username!: string;

  @IsEmail()
  mail!: string

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'password too weak' },
  )
  password!: string;
}
