import { config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { ConfigInterface } from './config.interface.js';
import { configShema, ConfigShema } from './config.shema.js';

@injectable()
export default class ConfigService implements ConfigInterface {
  private config: ConfigShema;
  private logger: LoggerInterface;

  constructor (@inject(Component.LoggerInterface) logger: LoggerInterface) {
    this.logger = logger;
    const parseOutput = config();
    if (parseOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }
    configShema.load({});
    configShema.validate({allowed: 'strict', output: this.logger.info});
    this.config = configShema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  get<T extends keyof ConfigShema>(key: T) {
    return this.config[key];
  }
}
