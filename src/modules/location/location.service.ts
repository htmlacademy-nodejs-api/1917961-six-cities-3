import { DocumentType, types } from '@typegoose/typegoose';
import { inject } from 'inversify';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import CreateLocationDto from './dto/create-location.dto.js';
import { LocationServiceInterface } from './location-service.interface.js';
import { LocationEntity } from './location.entity.js';

export default class LocationService implements LocationServiceInterface {
  constructor (
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.LocationModel) private readonly locationModel: types.ModelType<LocationEntity>
  ) {}

  public async create (dto: CreateLocationDto): Promise<DocumentType<LocationEntity>> {
    const location = new LocationEntity(dto);
    const result = await this.locationModel.create(location);
    this.logger.info(`New location created: ${result.id}`);
    return result;
  }

  public async findById(id: string): Promise<DocumentType<LocationEntity> | null> {
    return this.locationModel.findOne({id});
  }
}
