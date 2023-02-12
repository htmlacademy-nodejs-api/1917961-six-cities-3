import { DocumentType } from '@typegoose/typegoose';
import CreateLocationDto from './dto/create-location.dto.js';
import { LocationEntity } from './location.entity.js';

export interface LocationServiceInterface {
  create(dto: CreateLocationDto): Promise<DocumentType<LocationEntity>>
  findById(locationID: string): Promise<DocumentType<LocationEntity> | null>
}
