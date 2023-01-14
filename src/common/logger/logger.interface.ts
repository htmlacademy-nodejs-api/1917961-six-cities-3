export interface LoggerInterface {
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  errror(message: string, ...args: unknown[]): void;
  debug(message: string, ...args: unknown[]): void;
}
