export class Game {

  private score = 0;

  roll(numberOfKnockedDownPins: number): void {
    this.score+=numberOfKnockedDownPins;
  }

  getScore(): number {
    return this.score;
  }

}
