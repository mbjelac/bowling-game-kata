export class Game {

  private score = 0;
  private rollCount = 0;

  private spareCount = 0;

  roll(numberOfKnockedDownPins: number): void {

    this.increaseRollCount();

    this.score += numberOfKnockedDownPins * this.spareBonus();

    this.spareCount += numberOfKnockedDownPins;

  }

  private increaseRollCount() {
    if (this.rollCount == 20) {
      throw new Error('Cannot roll more than 20 times!');
    }

    this.rollCount++;
  }

  private spareBonus(): number {

    if(this.spareCount == 10) {
      return 2;
    }

    return 1;
  }

  getScore(): number {
    return this.score;
  }
}
