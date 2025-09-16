export class Game {
  private score = 0;

  private isNewFrame = true;

  roll(numberOfKnockedDownPins: number): void {
    this.validate(numberOfKnockedDownPins);


    const currentScore = this.score + numberOfKnockedDownPins;

    if (!this.isNewFrame && currentScore > 10) {
      throw new Error();
    }

    this.score = currentScore;
    this.isNewFrame = !this.isNewFrame;
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
