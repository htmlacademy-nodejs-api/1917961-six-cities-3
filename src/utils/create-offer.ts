import { Offer } from '../types/offer.type.js';

export default class CreateOffer {

  public createOffer(row: string): Offer {
    const tokens = row.replace('\n', '').split('\t');

    const [bedrooms, cityLocationLatitude, cityLocationLongitude, cityName, description, goods,
      hostAvatarUrl, hostIsPro, hostName, hostEmail, hostPassword, images, isFavorite, isPremium, locationLatitude,
      locationLongitude, maxAdults, previewImage, price, rating, title, type, date] = tokens;
    return {
      bedrooms: Number.parseInt(bedrooms, 10),
      city: {
        latitude: Number.parseFloat(cityLocationLatitude),
        longitude: Number.parseFloat(cityLocationLongitude),
        name: cityName,
      },
      description,
      goods: goods.split(', '),
      user: {
        avatarUrl: hostAvatarUrl,
        isPro: hostIsPro === 'true',
        name: hostName,
        email: hostEmail,
        password: hostPassword,
      },
      images: images.split(', '),
      isFavorite: isFavorite === 'true',
      isPremium: isPremium === 'true',
      latitude: Number.parseFloat(locationLatitude),
      longitude: Number.parseFloat(locationLongitude),
      maxAdults: Number.parseInt(maxAdults, 10),
      previewImage,
      price: Number.parseFloat(price),
      rating: Number.parseFloat(rating),
      title,
      type,
      date:  date,
    } as Offer;
  }

  public getErrorMessage (error: unknown): string {
    return error instanceof Error ? error.message : '';
  }
}
