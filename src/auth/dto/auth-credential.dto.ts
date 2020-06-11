import { IAuthCredentialsDto } from '@/models/auth/dto/auth.dto';
import { IsEmail, IsString } from 'class-validator';

export class AuthCredentialsDto implements IAuthCredentialsDto {
  @IsEmail()
  mail!: string

  @IsString()
  password!: string;
}
