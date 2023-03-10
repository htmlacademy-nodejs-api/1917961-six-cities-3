import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { User } from '../../types/user.type.js';
import { createSHA256 } from '../../utils/common.js';

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor (data: User) {
    super();
    this.avatarUrl = data.avatarUrl;
    this.isPro = data.isPro;
    this.name = data.name;
    this.email = data.email;
  }

  @prop()
  public avatarUrl!: string;

  @prop({required: true})
  public isPro!: boolean;

  @prop({required: true})
  public name!: string;

  @prop({unique: true, required: true})
  public email!: string;

  @prop({required: true})
  public password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
