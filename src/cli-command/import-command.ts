import { CliCommondInterface } from './cli-command.interface.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';

export default class ImportCommand implements CliCommondInterface {
  public readonly name = '--import';

  public async execute(filename: string): Promise<void> {
    const fileReader = new TSVFileReader(filename.trim());
    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {
      if(!(err instanceof Error)) {
        throw err;
      }
      console.log(`Не удалось импортировать данные из файла по причине: «${err.message}»`);
    }
  }
}
