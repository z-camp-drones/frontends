export class ArrayHelper {
  static flatten<T>(array: T[][]): T[] {
    return array.reduce(
      (accumulator, currentValue) => accumulator.concat(currentValue),
      []
    );
  }

  static shuffle<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  static removeUndefined<T>(array: T[]): T[] {
    return array.filter(a => a !== undefined);
  }

  static unique<T>(array: T[]): T[] {
    return array.filter((v, i, a) => a.indexOf(v) === i);
  }

  static pickRandom<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  static isEmpty<T>(array: T[]): boolean {
    return !array || array.length === 0;
  }
}
