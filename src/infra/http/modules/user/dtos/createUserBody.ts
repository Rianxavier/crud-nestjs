import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserBody {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
