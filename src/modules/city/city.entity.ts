import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { LocationEntity } from '../location/location.entity.js';

@modelOptions({
  schemaOptions: {
    collection: 'city'
  }
})
export class CityEntity extends defaultClasses.TimeStamps {
  constructor(location: Ref<LocationEntity>, name: string) {
    super();
    this.location = location;
    this.name = name;
  }

  @prop({
    ref: LocationEntity,
    required: true,
    _id: false
  })
  public location!: Ref<LocationEntity>;

  @prop({unique: true, require: true})
  public name!: string;
}

export const CityModel = getModelForClass(CityEntity);
