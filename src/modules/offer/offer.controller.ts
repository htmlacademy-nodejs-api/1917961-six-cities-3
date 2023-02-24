import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { ConfigInterface } from '../../common/config/config.interface.js';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { UploadFileMiddleware } from '../../common/middlewares/upload-file.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { ValidateFavoriteMiddleware } from '../../common/middlewares/validate-favorite.middleware.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../utils/common.js';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import CommentResponse from '../comment/comment.response.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { OfferPath } from './offer.enum.path.js';
import OfferResponse from './offer.response.js';
import UploadImageResponse from './upload-image.response.js';

type ParamsGetOffer = {
  offerId: string;
}

type ParamsGetOfferFavorite = {
  offerId: string;
  isFavorite: string;
}

@injectable()
export default class OfferController extends Controller {
  constructor (
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
  ) {
    super(logger, configService);
    this.logger.info('Register routes for OfferController…');
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.showOffers});

    this.addRoute({
      path: OfferPath.Root,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]});

    this.addRoute({
      path: OfferPath.Premium,
      method: HttpMethod.Get,
      handler: this.showPremium,
      middlewares: [new PrivateRouteMiddleware()]});

    this.addRoute({
      path: OfferPath.Favorite,
      method: HttpMethod.Get,
      handler: this.showFavorite,
      middlewares: [new PrivateRouteMiddleware()]});

    this.addRoute({
      path: OfferPath.UpdateFavorite,
      method: HttpMethod.Get,
      handler: this.updateFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateFavoriteMiddleware('isFavorite'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: OfferPath.Offer,
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: OfferPath.Offer,
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: OfferPath.Offer,
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: OfferPath.OfferComments,
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: OfferPath.OfferImagePreview,
      method: HttpMethod.Post,
      handler: this.uploadImagePreview,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
      ]
    });
    this.addRoute({
      path: OfferPath.OfferImage,
      method: HttpMethod.Post,
      handler: this.uploadImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
      ]
    });
  }

  public async showOffers(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const offersResponse = fillDTO(OfferResponse, offers);
    this.send(res, StatusCodes.OK, offersResponse);
  }

  public async show(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.findById(offerId);
    const offerResponse = fillDTO(OfferResponse, offer);
    this.send(res, StatusCodes.OK, offerResponse);
  }

  public async create(
    req: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response): Promise<void> {
    const {body, user} = req;
    const result = await this.offerService.create({...body, user: user.id});
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(OfferResponse, result)
    );
  }

  public async delete(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);
    const offerResponse = fillDTO(OfferResponse, offer);
    this.send(res, StatusCodes.OK, offerResponse);
  }

  public async update(
    {body, params}: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.updateById(offerId, body);
    const offerResponse = fillDTO(OfferResponse, offer);
    this.send(res, StatusCodes.OK, offerResponse);
  }

  public async showFavorite(_req: Request, res: Response): Promise<void> {
    console.log('getOffersFavorite');
    const offers = await this.offerService.findFavorite();
    const offersResponse = fillDTO(OfferResponse, offers);
    this.send(res, StatusCodes.OK, offersResponse);
  }

  public async showPremium(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findPremium();
    const offersResponse = fillDTO(OfferResponse, offers);
    this.send(res, StatusCodes.OK, offersResponse);
  }

  public async updateFavorite(
    {params}: Request<core.ParamsDictionary | ParamsGetOfferFavorite>,
    res: Response
  ): Promise<void> {
    const {offerId, isFavorite} = params;
    const offer = await this.offerService.updateById(offerId, {isFavorite: Boolean(Number(isFavorite))});
    const offerResponse = fillDTO(OfferResponse, offer);
    this.send(res, StatusCodes.OK, offerResponse);

  }

  public async getComments(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer, object, object>,
    res: Response
  ): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }

  public async uploadImagePreview(req: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response) {
    const {offerId} = req.params;
    const updateDto = { previewImage: req.file?.filename };
    await this.offerService.updateById(offerId, updateDto);
    this.created(res, fillDTO(UploadImageResponse, {updateDto}));
  }

  public async uploadImage(req: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response) {
    const {offerId} = req.params;
    const offer = await this.offerService.findById(offerId);
    const images = offer?.images ?? [];
    if (req.file?.filename !== undefined) {
      images.push(req.file?.filename);
    }
    const updateDto = { images: images };
    await this.offerService.updateById(offerId, updateDto);
    this.created(res, fillDTO(UploadImageResponse, {updateDto}));
  }

}
