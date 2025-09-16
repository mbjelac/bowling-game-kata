export class Game {
  private score = 0;

  roll(numberOfKnockedDownPins: number): void {
    this.validate(numberOfKnockedDownPins);

    const currentScore = this.score + numberOfKnockedDownPins;

    if (currentScore > 10) {
      throw new Error();
    }

    this.score = currentScore;
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
