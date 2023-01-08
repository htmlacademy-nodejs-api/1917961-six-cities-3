export default class RandomUtils {

  public generateRandomValue (beginNumber: number): number
  public generateRandomValue (beginNumber: number, endNumber: number): number
  public generateRandomValue (beginNumber: number, endNumber?: number): number {
    let begin = 0;
    let end = 0;
    if (endNumber !== undefined) {
      begin = beginNumber;
      end = endNumber;
    } else {
      begin = 1;
      end = beginNumber;
    }
    const rangeInteger = Math.abs(Math.abs(end) - Math.abs(begin)) + 1;
    return Math.floor(Math.random() * (rangeInteger) + Math.min(begin, end));
  }

  public generateRandomValueOneDecimal (int: number): string {
    const result = this.generateRandomValue(0, int);
    return result < int ? `${result.toString()}.${this.generateRandomValue(0,9).toString()}` : `${result.toString()}.0`;
  }

  public getRandomItems <T>(items: T[]):T[] {
    const startPosition = this.generateRandomValue(0, items.length - 2);
    const endPosition = startPosition + this.generateRandomValue(startPosition, items.length);
    return items.slice(startPosition, endPosition);
  }

  public getRandomItem <T>(items: T[]):T {
    return items[this.generateRandomValue(0, items.length - 1)];
  }

}
