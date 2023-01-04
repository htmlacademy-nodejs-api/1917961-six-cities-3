import { readFileSync } from 'fs';
import { FileReaderInterface } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor (public fileName: string) {}

  public read(): void {
    this.rawData = readFileSync(this.fileName, {encoding: 'utf8'});
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }
    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([bedrooms, cityLocationLatitude, cityLocationLongitude, cityLocationZoom, cityName, description, goods, hostAvatarUrl, hostId, hostIsPro, hostName, id, images, isFavorite, isPremium, locationLatitude, locationLongitude, locationZoom, maxAdults, previewImage, price, rating, title, type]) => ({
        bedrooms: Number.parseInt(bedrooms, 10),
        city: {
          location: {
            latitude: Number.parseFloat(cityLocationLatitude),
            longitude: Number.parseFloat(cityLocationLongitude),
            zoom: Number.parseInt(cityLocationZoom, 10),
          },
          name: cityName,
        },
        description,
        goods: goods.split(', '),
        host: {
          avatarUrl: hostAvatarUrl,
          id: Number.parseInt(hostId, 10),
          isPro: hostIsPro === 'true',
          name: hostName,
        },
        id: Number.parseInt(id, 10),
        images: images.split(', '),
        isFavorite: isFavorite === 'true',
        isPremium: isPremium === 'true',
        location: {
          latitude: Number.parseFloat(locationLatitude),
          longitude: Number.parseFloat(locationLongitude),
          zoom: Number.parseInt(locationZoom, 10),
        },
        maxAdults: Number.parseInt(maxAdults, 10),
        previewImage,
        price: Number.parseInt(price, 10),
        rating: Number.parseInt(rating, 10),
        title,
        type,
      }));
  }

}
