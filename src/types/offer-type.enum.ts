export enum OfferType {
  apartment = 'apartment',
  house = 'house',
  room = 'room',
  hotel = 'hotel'
}

export enum ItemsOfferType {
   maxBedrums = 8, //Количество комнат. Обязательное. Мин. 1, Макс. 8;
   maxAdults = 10, //Количество гостей. Обязательное. Мин. 1, Макс. 10;
   minPrice = 100, //Стоимость аренды. Обязательное. Мин. 100, Макс. 100 000;
   maxPrice = 100000, //Стоимость аренды. Обязательное. Мин. 100, Макс. 100 000;
   maxRating = 5, //Рейтинг. Обязательное. Число от 1 до 5. Допускаются числа с запятой (1 знак после запятой);
   fistWekDay = 1,
   lastWekDay = 7,
}
