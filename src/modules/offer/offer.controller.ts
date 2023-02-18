import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../utils/common.js';
import CityResponse from '../city/city.response.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import OfferResponse from './offer.response.js';

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
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController…');
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.getOffers});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/premium', method: HttpMethod.Get, handler: this.getOffersPremium});
    this.addRoute({path: '/favorite', method: HttpMethod.Get, handler: this.getOffersFavorite});
    this.addRoute({path: '/favorite/:offerId/:isFavorite', method: HttpMethod.Get, handler: this.updateOffersFavorite});
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.getOffer});
    this.addRoute({path: '/:offerId', method: HttpMethod.Delete, handler: this.delete});
    this.addRoute({path: '/:offerId', method: HttpMethod.Patch, handler: this.update});
  }

  public async getOffers(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const offersResponse = offers.map((offer) => {
      const cityResponse = fillDTO(CityResponse, offer.city);
      const offerResponse = {...fillDTO(OfferResponse, offer), cityResponse};
      return offerResponse;
    });
    this.send(res, StatusCodes.OK, offersResponse);
  }

  public async getOffer(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.findById(offerId);
    if(offer) {
      const cityResponse = fillDTO(CityResponse, offer.city);
      const offerResponse = {...fillDTO(OfferResponse, offer), cityResponse};
      this.send(res, StatusCodes.OK, offerResponse);
    } else {
      this.noContent(res, offer);
    }
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response): Promise<void> {
    const result = await this.offerService.create(body);
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
    if(offer) {
      const cityResponse = fillDTO(CityResponse, offer.city);
      const offerResponse = {...fillDTO(OfferResponse, offer), cityResponse};
      this.send(res, StatusCodes.OK, offerResponse);
    } else {
      this.noContent(res, offer);
    }
  }

  public async update(
    {body, params}: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.updateById(offerId, body);
    if(offer) {
      const cityResponse = fillDTO(CityResponse, offer.city);
      const offerResponse = {...fillDTO(OfferResponse, offer), cityResponse};
      this.send(res, StatusCodes.OK, offerResponse);
    } else {
      this.noContent(res, offer);
    }
  }

  public async getOffersFavorite(_req: Request, res: Response): Promise<void> {
    console.log('getOffersFavorite');
    const offers = await this.offerService.findFavorite();
    const offersResponse = offers.map((offer) => {
      const cityResponse = fillDTO(CityResponse, offer.city);
      const offerResponse = {...fillDTO(OfferResponse, offer), cityResponse};
      return offerResponse;
    });
    this.send(res, StatusCodes.OK, offersResponse);
  }

  public async getOffersPremium(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findPremium();
    const offersResponse = offers.map((offer) => {
      const cityResponse = fillDTO(CityResponse, offer.city);
      const offerResponse = {...fillDTO(OfferResponse, offer), cityResponse};
      return offerResponse;
    });
    this.send(res, StatusCodes.OK, offersResponse);
  }

  public async updateOffersFavorite(
    {params}: Request<core.ParamsDictionary | ParamsGetOfferFavorite>,
    res: Response
  ): Promise<void> {
    const {offerId, isFavorite} = params;
    console.log(isFavorite);
    console.log(offerId);
    const offer = await this.offerService.updateById(offerId, {isFavorite: isFavorite === '1'});
    console.log(offer);
    if(offer) {
      const cityResponse = fillDTO(CityResponse, offer.city);
      const offerResponse = {...fillDTO(OfferResponse, offer), cityResponse};
      this.send(res, StatusCodes.OK, offerResponse);
    } else {
      this.noContent(res, offer);
    }
  }

}
