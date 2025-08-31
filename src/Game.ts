export class Game {

  private readonly rollPins: number[] = [];

  roll(numberOfKnockedDownPins: number): void {
    this.writePins(numberOfKnockedDownPins);
  }

  private writePins(pins: number) {
    if (this.rollPins.length == 20) {
      throw new Error('Cannot roll more than 20 times!');
    }

    this.rollPins.push(pins);
  }

  getScore(): number {
    let score = 0;
    this.rollPins.forEach((pins, index) => {

      score += pins;

      if (index > 0) {
        if (this.lastFrameWasSpare(index) || this.lastFrameWasStrike(index)) {
          score += pins;
        }
      }
    });

    return score;
  }


  private lastFrameWasSpare(index: number) {
    return index % 2 == 0 && this.rollPins[index - 1] + this.rollPins[index - 2] == 10;
  }

  private lastFrameWasStrike(index: number) {
    return this.rollPins[index-1] == 10;
  }
}
