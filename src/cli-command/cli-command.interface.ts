export interface CliCommondInterface {
  readonly name: string;
  execute(...params: string[]): void;

}
