import { Game } from "./Game";

const game = new Game();

it("score of one role is the sum of knocked down pins", () => {

  game.roll(2);
  game.roll(3);

  expect(game.getScore()).toBe(5);
});
