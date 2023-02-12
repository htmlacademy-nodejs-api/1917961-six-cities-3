import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Location } from '../../types/location.type.js';

export interface LocationEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'location'
  }
})
export class LocationEntity extends defaultClasses.TimeStamps implements Location {
  constructor (data: Location) {
    super();
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.zoom = data.zoom;
  }

  @prop({required: true})
  public latitude!: number;

  @prop({required: true})
  public longitude!: number;

  @prop({required: true})
  public zoom!: number;

}

export const LocationModel = getModelForClass(LocationEntity);
