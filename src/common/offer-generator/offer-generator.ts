import dayjs from 'dayjs';
import { MAX_BEDROOMS, MAX_ADULTS, MIN_PRICE, MAX_PRICE, FIRST_WEEK_DAY, LAST_WEEK_DAY } from '../../const.js';
import { City } from '../../types/city.type.js';
import { Host } from '../../types/host.type.js';
import { Location } from '../../types/location.type.js';
import { MockData } from '../../types/mock-data.type.js';
import RandomUtils from '../../utils/random-utils.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

export class OfferGenerator implements OfferGeneratorInterface {
  private randomUtils = new RandomUtils();
  private offerId = 0;

  constructor (private readonly mockData: MockData) {

  }

  public generate(): string {
    const bedrooms = this.randomUtils.generateRandomValue(MAX_BEDROOMS).toString();
    const city: City = this.randomUtils.getRandomItem<City>(this.mockData.cities);
    const description = this.randomUtils.getRandomItem<string>(this.mockData.description);
    const goods = this.randomUtils.getRandomItems<string>(this.mockData.goods).join(', ');
    const host: Host = this.randomUtils.getRandomItem<Host>(this.mockData.hosts);
    const id = this.offerId++;
    const images = this.randomUtils.getRandomItems<string>(this.mockData.images).join(', ');
    const isFavorite = Boolean(this.randomUtils.generateRandomValue(0,1)).toString();
    const isPremium = Boolean(this.randomUtils.generateRandomValue(0,1)).toString();
    const location: Location = this.randomUtils.getRandomItem<Location>(this.mockData.locations);
    const maxAdults = this.randomUtils.generateRandomValue(MAX_ADULTS).toString();
    const previewImage = this.randomUtils.getRandomItem<string>(this.mockData.images);
    const price = this.randomUtils.generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const rating = this.randomUtils.generateRandomValueOneDecimal(5);
    const title = this.randomUtils.getRandomItem<string>(this.mockData.title);
    const type = this.randomUtils.getRandomItem<string>(this.mockData.type);
    const createDate = dayjs().subtract(this.randomUtils.generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    return [
      bedrooms,
      city.location.latitude.toString(),
      city.location.longitude.toString(),
      city.location.zoom.toString(),
      city.name,
      description,
      goods,
      host.avatarUrl,
      host.id.toString(),
      host.isPro.toString(),
      host.name,
      host.email,
      host.password,
      id.toString(),
      images,
      isFavorite.toString(),
      isPremium.toString(),
      location.latitude.toString(),
      location.longitude.toString(),
      location.zoom.toString(),
      maxAdults.toString(),
      previewImage,
      price.toString(),
      rating,
      title,
      type,
      createDate
    ].join('\t');
  }

}
