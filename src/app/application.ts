import { inject, injectable } from 'inversify';
import { ConfigInterface } from '../common/config/config.interface.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { CityModel } from '../modules/city/city.entity.js';
import { LocationModel } from '../modules/location/location.entity.js';
import { UserModel } from '../modules/user/user.entity.js';
import { Component } from '../types/component.types.js';
import { getURI } from '../utils/db.js';

@injectable()
export default class AppLication {

  constructor (
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
  ) {}

  public async init () {
    this.logger.info('Aplication initialization...');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    this.databaseClient.connect(uri);

    const user = await UserModel.create({
      email: 'test4@email.local',
      avatarUrl: 'keks.jpg',
      name: 'Keks',
      password: 'Unknown',
      isPro: true
    });
    console.log(user);
    const locationPris = await LocationModel.create({
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 12,
    });
    console.log(locationPris);
    const city = await CityModel.create({
      location: locationPris._id,
      name: 'Paris1'
    });
    console.log(city);
  }
}
