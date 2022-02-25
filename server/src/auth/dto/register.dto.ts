import { User } from './../../users/entities/user.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UniqueOnDatabase } from '../validation/UniqueValidation';

export class RegisterDto {
  @IsEmail()
  @UniqueOnDatabase(User)
  email: string;
  username: string;
  @IsNotEmpty()
  password: string;
}
