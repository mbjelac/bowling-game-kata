import { Game } from "./Game";

let game: Game;


beforeEach(() => {
  game = new Game();
});

it("score is sum of knocked down pins", () => {

  game.roll(2);
  game.roll(3);

  expect(game.getScore()).toBe(5);
});

it("can not roll more than 20 times", () => {

  Array(20)
  .fill(0)
  .forEach(() => {
    game.roll(1);
  });

  expect(() => game.roll(1)).toThrow();
});
