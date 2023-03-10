import { injectable } from 'inversify';
import pino, { Logger } from 'pino';
import { LoggerInterface } from './logger.interface.js';

@injectable()
export default class LoggerService implements LoggerInterface{
  private logger!: Logger;

  constructor () {
    this.logger = pino();
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    this.logger.error(message, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }
}
