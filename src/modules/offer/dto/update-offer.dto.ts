import { City } from '../../../types/city.type.js';

export class UpdateOfferDto {
  public bedrooms?: number;
  public city?: City;
  public description?: string;
  public goods?: string[];
  public images?: string[];
  public isFavorite?: boolean;
  public isPremium?: boolean;
  public latitude?: number;
  public longitude?: number;
  public maxAdults?: number;
  public previewImage?: string;
  public price?: number;
  public rating?: number;
  public title?: string;
  public type?: string;
  public date?: string;
}
