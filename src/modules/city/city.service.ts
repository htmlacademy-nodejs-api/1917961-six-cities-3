import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { LocationServiceInterface } from '../location/location-service.interface.js';
import { CityServiceInterface } from './city-service.interface.js';
import { CityEntity } from './city.entity.js';
import CreatreCityDto from './dto/create-city.dto.js';

@injectable()
export default class CityService implements CityServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.CityModel) private readonly cityModel: types.ModelType<CityEntity>,
    @inject(Component.LocationServiceInterface) private readonly locationService: LocationServiceInterface,
  ) {}

  public async create(dto: CreatreCityDto): Promise<DocumentType<CityEntity>> {
    const location = this.locationService.create(dto.location);
    const result = await this.cityModel.create({...dto, location: (await location).id});
    this.logger.info(`New city created: ${dto.name}`);
    return result;
  }

  public async findByCity(name: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({name});
  }

  public async findOrCreate(dto: CreatreCityDto): Promise<DocumentType<CityEntity>> {
    const existedCity = await this.findByCity(dto.name);
    if (existedCity) {
      return existedCity;
    }
    return this.create(dto);
  }

}

