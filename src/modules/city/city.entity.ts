import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    collection: 'city'
  }
})
export class CityEntity extends defaultClasses.TimeStamps {
  constructor(latitude: number, longitude: number, name: string) {
    super();
    this.latitude = latitude;
    this.longitude = longitude;
    this.name = name;
  }

  @prop({require: true})
  public latitude!: number;

  @prop({require: true})
  public longitude!: number;

  @prop({unique: true, require: true})
  public name!: string;
}

export const CityModel = getModelForClass(CityEntity);
