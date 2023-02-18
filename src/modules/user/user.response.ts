import {Expose} from 'class-transformer';

export default class UserResponse {

  @Expose()
  public avatarUrl!: string;

  @Expose()
  public isPro!: boolean;

  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

}
