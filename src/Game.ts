export class Game {
  private score = 0;

  roll(numberOfKnockedDownPins: number): void {
    if (
      numberOfKnockedDownPins < 0
      || numberOfKnockedDownPins > 10
    ) {
      throw new Error();
    }

    this.score = numberOfKnockedDownPins;
  }

  getScore(): number {
    return this.score;
  }

}
