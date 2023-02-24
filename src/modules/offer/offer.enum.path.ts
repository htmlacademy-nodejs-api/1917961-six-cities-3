export enum OfferPath {
  Root = '/',
  Premium = '/premium',
  Favorite = '/favorite',
  UpdateFavorite = '/favorite/:offerId/:isFavorite',
  Offer = '/:offerId',
  OfferComments = '/:offerId/comments',
  OfferImagePreview = '/:offerId/imagePreview',
  OfferImage = '/:offerId/image'
}
