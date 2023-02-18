import {inject, injectable} from 'inversify';
import {OfferServiceInterface} from './offer-service.interface.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { SortType } from '../../types/sort-type.enum.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

const OFFER_COUNT_DEFAULT = 60;
const OFFER_COUNT_PREMIUM = 3;

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async findById(_id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(_id)
      .populate(['user', 'city'])
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? OFFER_COUNT_DEFAULT;
    return this.offerModel
      .find()
      .sort({createdAt: SortType.Down})
      .limit(limit)
      .populate(['user', 'city'])
      .exec();
  }

  public async findPremium(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? OFFER_COUNT_PREMIUM;
    return this.offerModel
      .find({isPremium:	true}, {}, {limit})
      .sort({createdAt: SortType.Down})
      .populate(['user', 'city'])
      .exec();
  }

  public async findFavorite(): Promise<DocumentType<OfferEntity>[]> {
    console.log('findFavorite');
    return this.offerModel
      .find({isFavorite :	true})
      .sort({createdAt: SortType.Down})
      .populate(['user', 'city'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['user', 'city'])
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }}, {new: true}).exec();
  }

  async calcRating(offerId: string, rating: number): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.findById(offerId);
    const oldRating = offer?.rating;
    let newRating = rating;
    if (oldRating) {
      newRating = (oldRating + rating) / 2;
    }
    return this.offerModel
      .findByIdAndUpdate(offerId, {rating: newRating}, {new: true})
      .populate(['user', 'city'])
      .exec();
  }
}
