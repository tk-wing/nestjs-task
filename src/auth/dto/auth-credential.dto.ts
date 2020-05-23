import { IsString, IsEmail } from 'class-validator';
import { IAuthCredentialsDto } from '@/models/auth/dto/auth.dto';

export class AuthCredentialsDto implements IAuthCredentialsDto {
  @IsEmail()
  mail!: string

  @IsString()
  password!: string;
}
