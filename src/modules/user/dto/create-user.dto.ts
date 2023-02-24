import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';

export default class CreateUserDto {

  @IsBoolean({message: 'isPro is required'})
  public isPro!: boolean;

  @IsString({message: 'lastname is required'})
  @Length(1, 15, {message: 'Min length is 1, max is 15'})
  public name!: string;

  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string;

  @IsString({message: 'password is required'})
  @Length(6, 12, {message: 'Min length for password is 6, max is 12'})
  public password!: string;
}
