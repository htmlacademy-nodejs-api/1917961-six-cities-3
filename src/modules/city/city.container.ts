import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Component } from '../../types/component.types.js';
import { CityServiceInterface } from './city-service.interface.js';
import { CityEntity, CityModel } from './city.entity.js';
import CityService from './city.service.js';

const cityContainer = new Container();

cityContainer.bind<CityServiceInterface>(Component.CityServiceInterface).to(CityService);
cityContainer.bind<types.ModelType<CityEntity>>(Component.CityModel).toConstantValue(CityModel);

export {cityContainer};
