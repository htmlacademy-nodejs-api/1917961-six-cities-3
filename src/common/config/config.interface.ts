import { ConfigShema } from './config.shema.js';

export interface ConfigInterface {
  get<T extends keyof ConfigShema>(key: T): ConfigShema[T];
}
