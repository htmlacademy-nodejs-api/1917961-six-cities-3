import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Component } from '../../types/component.types.js';
import { LocationServiceInterface } from './location-service.interface.js';
import { LocationEntity, LocationModel } from './location.entity.js';
import LocationService from './location.service.js';

const locationContainer = new Container();

locationContainer.bind<LocationServiceInterface>(Component.LocationServiceInterface).to(LocationService).inSingletonScope();
locationContainer.bind<types.ModelType<LocationEntity>>(Component.LocationModel).toConstantValue(LocationModel);

export { locationContainer };
