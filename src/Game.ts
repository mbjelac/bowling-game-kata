export class Game {

  private score = 0;
  private rollCount = 0;

  roll(numberOfKnockedDownPins: number): void {

    if (this.rollCount == 20) {
      throw new Error('Cannot roll more than 20 times!');
    }

    this.score+=numberOfKnockedDownPins;
    this.rollCount++;
  }

  getScore(): number {
    return this.score;
  }

}
