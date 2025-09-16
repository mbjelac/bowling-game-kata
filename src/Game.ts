export class Game {
  private score = 0;

  private isNewFrame = true;

  private frameScore = 0;

  private previousFrameScore = 0;

  roll(numberOfKnockedDownPins: number): void {
    this.validate(numberOfKnockedDownPins);

    if (this.isNewFrame) {
      this.previousFrameScore = this.frameScore;
      this.frameScore = 0;
    }

    if (
      !this.isNewFrame
      && this.frameScore + numberOfKnockedDownPins > 10
    ) {
      throw new Error();
    }

    const spareBonus =
      this.previousFrameScore == 10
      && this.isNewFrame
        ? numberOfKnockedDownPins
        : 0

    this.frameScore += numberOfKnockedDownPins;
    this.score =
      this.score
      + numberOfKnockedDownPins
      + spareBonus;
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
