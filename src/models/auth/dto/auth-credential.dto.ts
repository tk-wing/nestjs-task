import { IsString, MinLength, MaxLength, Matches, IsEmail } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  mail!: string

  @IsString()
  password!: string;
}
