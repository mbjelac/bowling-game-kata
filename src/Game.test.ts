import { Game } from "./Game";

let game: Game;

beforeEach(() => {
  game = new Game();
});

describe("the game consists of 10 frames with 2 rolls each", () => {

  it("can not roll more than 10 frames with no spares & no strikes", () => {
    whenRollsKnockDown(
      1, 2,
      1, 2,
      1, 2,
      1, 2,
      1, 2,
      1, 2,
      1, 2,
      1, 2,
      1, 2,
      1, 2,
    );

    thenNoMoreRollsAllowed();
  });

});

function whenRollsKnockDown(...konckedDownPins: number[]) {
  konckedDownPins.forEach(pins => {
    game.roll(pins);
  });
}

function thenNoMoreRollsAllowed() {
  expect(
    () => game.roll(1)
  )
  .toThrow();
}
