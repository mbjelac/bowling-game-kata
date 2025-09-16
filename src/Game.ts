export class Game {
  private score = 0

  private numberOfRolls = 0

  private frame: Array<number> = []

  private gameFinished = false;

  roll(numberOfKnockedDownPins: number): void {
    this.validateRoll(numberOfKnockedDownPins);

    this.numberOfRolls++;

    this.score += numberOfKnockedDownPins;

    this.addRollToFrame(numberOfKnockedDownPins);

  }

  private addRollToFrame(numberOfKnockedDownPins: number) {
    if (this.frame.length === 2) {
      this.addSpareBonus(numberOfKnockedDownPins);
      this.frame = [];
    }

    this.frame.push(numberOfKnockedDownPins);

    const sumOfPinsInFrame = this.frame.reduce((acc, curr) => acc + curr, 0)
    if (sumOfPinsInFrame > 10) {
      throw new Error('Cannot knock down more than 10 pins in frame!');
    }
  }

  private addSpareBonus(numberOfKnockedDownPins: number) {
    const sumOfPinsInOldFrame = this.frame.reduce((acc, curr) => acc + curr, 0)
    if (sumOfPinsInOldFrame === 10) {
      this.score += numberOfKnockedDownPins;
    }
  }

  private validateRoll(numberOfKnockedDownPins: number) {

    if (numberOfKnockedDownPins > 10 || numberOfKnockedDownPins < 0) {
      throw new Error(`Cannot knock down ${numberOfKnockedDownPins} pins`);
    }

    if (this.numberOfRolls === this.getMaximumNumberOfRolls()) {
      throw new Error('Cannot roll after 20 rolls');
    }
  }

  getMaximumNumberOfRolls(): number {
    return this.lastFrameHasSpare() ? 21 : 20;
  }

  getScore(): number {
    return this.score;
  }

  private lastFrameHasSpare(): boolean {
    return this.frame[0] + this.frame[1] === 10;
  }
}
