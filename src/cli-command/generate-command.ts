//import { appendFile } from 'fs/promises';
import got from 'got';
import TSVFileWriter from '../common/file-writer.tsv/tsv-file-writer.js';
import { OfferGenerator } from '../common/offer-generator/offer-generator.js';
import { MockData } from '../types/mock-data.type.js';
import { CliCommondInterface } from './cli-command.interface.js';

export default class GenerayeCommand implements CliCommondInterface{
  public readonly name = '--generate';
  private initialData!: MockData;

  public async execute(...parameters:string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);
    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log(`Can't fetch data from ${url}.`);
    }
    const offerGeneratorString = new OfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for(let i = 0; i < offerCount; i++) {
      //await appendFile(filepath, `${offerGeneratorSttring.generate()}\n`, 'utf8');
      await tsvFileWriter.write(offerGeneratorString.generate());
    }
  }

}
