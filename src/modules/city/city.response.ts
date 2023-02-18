import { Expose } from 'class-transformer';

export default class CityResponse {
  @Expose()
  public latitude!: number;

  @Expose()
  public longitude!: number;

  @Expose()
  public name!: string;
}
