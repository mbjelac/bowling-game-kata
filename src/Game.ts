export class Game {

  private readonly rollPins: number[] = [];

  private frameFinished = true;

  private finishedFrames = 0;

  roll(numberOfKnockedDownPins: number): void {
    this.writePins(numberOfKnockedDownPins);
  }

  private writePins(pins: number) {

    if (pins < 0 || pins > 10) {
      this.throwError(`You cannot knock down ${pins} pins!`);
    }

    if (this.rollPins.length == 20) {
      this.throwError('Cannot roll more than 20 times!');
    }

    if(this.finishedFrames==10){
      this.throwError("Cannot play more than 10 frames!");
    }

    if (
      this.rollPins.length > 0
      && !this.frameFinished
      && this.rollPins[this.rollPins.length - 1] + pins > 10
      && this.rollPins[this.rollPins.length - 1] < 10
    ) {
      this.throwError('Cannot roll more than 10 pins in a frame!');
    }

    this.rollPins.push(pins);

    this.frameFinished = pins == 10 || !this.frameFinished;

    if(this.frameFinished) {
      this.finishedFrames++;
    }
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
    return this.rollPins[index - 1] == 10;
  }

  private throwError(message: string) {
    throw new Error(message + ' ... Rolls: ' + this.rollPins.join(', '));
  }
}
