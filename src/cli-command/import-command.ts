import { CliCommondInterface } from './cli-command.interface.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import CreateOffer from '../utils/create-offer.js';

export default class ImportCommand implements CliCommondInterface {
  public readonly name = '--import';
  public offer = new CreateOffer();

  private onLineRead = (line: string) => {
    const offer1 = this.offer.createOffer(line);
    console.log(offer1);
  };

  private onCompleteRead = (count: number) => {
    console.log(`${count.toString} rows imported.`);
  };

  public async execute(filename: string): Promise<void> {
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('onLineRead', this.onLineRead);
    fileReader.on('onCompleteRead', this.onCompleteRead);
    try {
      await fileReader.read();
    } catch (err) {
      console.log(`Can't read the file: ${this.offer.getErrorMessage(err)}`);
    }
  }
}
