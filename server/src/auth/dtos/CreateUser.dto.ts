import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsUrl()
  linkedInUrl?: string;
}
