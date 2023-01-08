import { Offer } from '../types/offer.type.js';

export default class CreateOffer {

  public createOffer(row: string): Offer {
    const tokens = row.replace('\n', '').split('\t');

    const [bedrooms, cityLocationLatitude, cityLocationLongitude, cityLocationZoom, cityName, description, goods,
      hostAvatarUrl, hostId, hostIsPro, hostName, hostEmail, hostPassword, id, images, isFavorite, isPremium, locationLatitude,
      locationLongitude, locationZoom, maxAdults, previewImage, price, rating, title, type, date] = tokens;
    return {
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
        email: hostEmail,
        password: hostPassword,
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
