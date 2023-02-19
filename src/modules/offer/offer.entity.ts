import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { GoodsType } from '../../types/goods-type.ennum.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { CityEntity } from '../city/city.entity.js';
import { UserEntity } from '../user/user.entity.js';

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {

  @prop({required: true})
  public bedrooms!: number;

  @prop({
    ref: CityEntity,
    required: true,
    _id: false
  })
  public city!: Ref<CityEntity>;

  @prop({required: true, trim: true})
  public description!: string;

  @prop({required: true, default: [], type: String})
  public goods!: Array<GoodsType>;

  @prop({
    ref: UserEntity,
    required: true,
    _id: false,
  })
  public user!: Ref<UserEntity>;

  @prop({required: true, default: [], type: String})
  public images!: string[];

  @prop({required: true})
  public isFavorite!: boolean;

  @prop({required: true})
  public isPremium!: boolean;

  @prop({required: true})
  public latitude!: number;

  @prop({required: true})
  public longitude!: number;

  @prop({required: true})
  public maxAdults!: number;

  @prop({required: true})
  public previewImage!: string;

  @prop({required: true})
  public price!: number;

  @prop({required: true})
  public rating!: number;

  @prop({required: true, trim: true})
  public title!: string;

  @prop({required: true})
  public type!: OfferType;

  @prop({required: true})
  public date!: string;

  @prop({default: 0})
  public commentCount!: number;

}

export const OfferModel = getModelForClass(OfferEntity);
