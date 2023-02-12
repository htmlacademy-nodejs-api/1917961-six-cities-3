import { City } from '../../../types/city.type.js';
import { Location } from '../../../types/location.type.js';
import { User } from '../../../types/user.type.js';

export class CreateOfferDto {
  public bedrooms!: number;
  public city!: City;
  public description!: string;
  public goods!: string[];
  public user!: User;
  public images!: string[];
  public isFavorite!: boolean;
  public isPremium!: boolean;
  public location!: Location;
  public maxAdults!: number;
  public previewImage!: string;
  public price!: number;
  public rating!: number;
  public title!: string;
  public type!: string;
  public date!: string;
}
