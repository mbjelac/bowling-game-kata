export class Game {
  private score = 0;

  private isNewFrame = true;

  private frameScore = 0;

  roll(numberOfKnockedDownPins: number): void {
    this.validate(numberOfKnockedDownPins);

    if(this.isNewFrame) {
      this.frameScore = 0;
    }

    if (
      !this.isNewFrame
      && this.frameScore + numberOfKnockedDownPins > 10
    ) {
      throw new Error();
    }

    this.frameScore = numberOfKnockedDownPins;
    this.score = this.score + numberOfKnockedDownPins;
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
