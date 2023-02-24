import { IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { City } from '../../../types/city.type.js';
import { GoodsType } from '../../../types/goods-type.enum.js';
import { OfferType } from '../../../types/offer-type.enum.js';

export class UpdateOfferDto {

  @IsInt({message: 'Bedrooms must be an integer'})
  @Min(1, {message: 'Minimum bedrooms is 1'})
  @Max(8, {message: 'Maximum bedrooms is 8'})
  public bedrooms?: number;

  @IsMongoId({message: 'cityId field must be valid an id'})
  public city?: City;

  @IsString({message: 'description is required'})
  @Length(20, 1024, {message: 'Min length is 20, max is 1024'})
  public description?: string;

  @IsArray({message: 'Field goods must be an array'})
  @IsEnum(GoodsType, {each: true, message: 'type must be Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels, Fridge;'})
  public goods?: Array<GoodsType>;

  @IsArray({message: 'Field images must be an array'})
  public images?: string[];

  @IsBoolean({message: 'isFavorite is required'})
  public isFavorite?: boolean;


  @IsBoolean({message: 'isPremium is required'})
  public isPremium?: boolean;

  @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'Adults must be an number'})
  public latitude?: number;

  @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'Adults must be an number'})
  public longitude?: number;

  @IsInt({message: 'Adults must be an integer'})
  @Min(1, {message: 'Minimum adults is 1'})
  @Max(10, {message: 'Maximum adults is 10'})
  public maxAdults?: number;

  @IsString({message: 'previewImage is required'})
  public previewImage?: string;

  @IsInt({message: 'Price must be an integer'})
  @Min(100, {message: 'Minimum price is 1'})
  @Max(100000, {message: 'Maximum price is 10'})
  public price?: number;

  @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 1}, {message: 'rating must be an number'})
  public rating?: number;

  @IsString({message: 'title is required'})
  @Length(10, 100, {message: 'Min length is 10, max is 100'})
  public title?: string;

  @IsEnum(OfferType, {message: 'type must be apartment, house, room, hotel'})
  public type?: OfferType;

  @IsString({message: 'date is required'})
  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public date?: string;
}
