export class Game {
  private score = 0;

  roll(numberOfKnockedDownPins: number): void {
    this.validate(numberOfKnockedDownPins);

    this.score += numberOfKnockedDownPins;
  }

  private validate(numberOfKnockedDownPins: number) {
    if (
      numberOfKnockedDownPins < 0
      || numberOfKnockedDownPins > 10
    ) {
      throw new Error();
    }
  }

  getScore(): number {
    return this.score;
  }

}
