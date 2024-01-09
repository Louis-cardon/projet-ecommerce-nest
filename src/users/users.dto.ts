import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  firstName: string;

  @IsString()
  @MinLength(1)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  firstName?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
