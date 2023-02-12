import { DocumentType } from '@typegoose/typegoose';
import { CityEntity } from './city.entity.js';
import CreatreCityDto from './dto/create-city.dto.js';

export interface CityServiceInterface {
  create(dto: CreatreCityDto): Promise<DocumentType<CityEntity>>
  findByCity(cyti: string): Promise<DocumentType<CityEntity> | null>
  findOrCreate(dto: CreatreCityDto): Promise<DocumentType<CityEntity>>
}
