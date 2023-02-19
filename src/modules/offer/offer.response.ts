import { Expose, Type } from 'class-transformer';
import CityResponse from '../city/city.response.js';

export default class OfferResponse {
  @Expose()
  @Type(() => CityResponse)
  public city!: CityResponse;

  @Expose()
  public price!: number;

  @Expose()
  public title!: string;

  @Expose()
  public type!: string;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public date!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public commentCount!: number;

}
