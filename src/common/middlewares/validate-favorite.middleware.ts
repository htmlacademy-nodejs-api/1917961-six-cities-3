import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {MiddlewareInterface} from '../../types/middleware.interface.js';
import HttpError from '../errors/http-error.js';

export class ValidateFavoriteMiddleware implements MiddlewareInterface {
  constructor(private param: string) {}

  public execute({params}: Request, _res: Response, next: NextFunction): void {
    const favorite = params[this.param];

    if (favorite === '0' || favorite === '1') {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${favorite} is invalid status Favorite`,
      'ValidateFavoriteMiddleware'
    );
  }
}
