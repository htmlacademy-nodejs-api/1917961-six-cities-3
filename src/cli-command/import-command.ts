import { CliCommondInterface } from './cli-command.interface.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import CreateOffer from '../utils/create-offer.js';
import { UserServiceInterface } from '../modules/user/user-service.interface.js';
import { CityServiceInterface } from '../modules/city/city-service.interface.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import OfferService from '../modules/offer/offer.service.js';
import { OfferModel } from '../modules/offer/offer.entity.js';
import CityService from '../modules/city/city.service.js';
import { CityModel } from '../modules/city/city.entity.js';
import UserService from '../modules/user/user.service.js';
import { UserModel } from '../modules/user/user.entity.js';
import DatabaseService from '../common/database-client/database.service.js';
import { Offer } from '../types/offer.type.js';
import { getURI } from '../utils/db.js';

const DEFAULT_DB_PORT = 27017;

export default class ImportCommand implements CliCommondInterface {
  public readonly name = '--import';
  public offer = new CreateOffer();
  private userService!: UserServiceInterface;
  private cityService!: CityServiceInterface;
  private offerService!: OfferService;
  private databaseService!: DatabaseInterface;
  private logger!: LoggerInterface;
  private salt!: string;

  constructor () {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.cityService = new CityService(this.logger, CityModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new DatabaseService(this.logger);
  }


  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.user
    }, this.salt);

    const city = await this.cityService.findOrCreate(offer.city);

    await this.offerService.create({
      ...offer,
      city: city.id,
      user: user.id,
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const offer1 = this.offer.createOffer(line);
    await this.saveOffer(offer1);
    resolve();
  }

  private onComplete = (count: number) => {
    console.log(`${count.toString} rows imported.`);
    this.databaseService.disconnect();
  };

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;
    console.log(this.salt);

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);
    try {
      await fileReader.read();
    } catch (err) {
      console.log(`Can't read the file: ${this.offer.getErrorMessage(err)}`);
    }
  }
}
