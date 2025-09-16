import { Game } from "./Game";

let game: Game;

beforeEach(() => {
  game = new Game();
});

it("can not knock down more than 10 pins", () => {
  expect(() => game.roll(11)).toThrow();
});
