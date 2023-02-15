import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.types.js';
import { SortType } from '../../types/sort-type.enum.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';

const COMMENT_COUNT_DEFAULT = 60;

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.OfferServiceInterface) private offerService: OfferServiceInterface,
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    await this.offerService.calcRating(dto.offerId, dto.rating);
    return comment.populate('userId');
  }

  public async findByOfferId(offerId: string, count?: number): Promise<DocumentType<CommentEntity>[]> {
    const limit = count ?? COMMENT_COUNT_DEFAULT;
    return this.commentModel
      .find({offerId})
      .sort({createdAt: SortType.Down})
      .limit(limit)
      .populate('userId');
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }
}
