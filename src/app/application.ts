import { inject, injectable } from 'inversify';
import { ConfigInterface } from '../common/config/config.interface.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { CommentServiceInterface } from '../modules/comment/comment-service.interface.js';
import { Component } from '../types/component.types.js';
import { getURI } from '../utils/db.js';

@injectable()
export default class AppLication {

  constructor (
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
    @inject(Component.CommentServiceInterface) private commsentSrvice: CommentServiceInterface,
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

    const comment = await this.commsentSrvice.create({
      text: 'bad',
      offerId: '63ea6c97c15edb4eaa034388',
      userId: '63ea6c97c15edb4eaa034371',
      rating: 1,
    });
    console.log(comment);
  }
}
