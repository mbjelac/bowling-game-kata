import { Game } from "./Game";

let game: Game;

beforeEach(() => {
  game = new Game();
});

it("initial score is 0", () => {
  expect(game.getScore()).toEqual(0);
});

it("can not knock down more than 10 pins", () => {
  cannotRoll(11);
});

it("can not knock down negative number of pins", () => {
  cannotRoll(-1);
});

it("can knock down 10 pins or less", () => {
  expect(() => roll(10)).not.toThrow();
});

it("score is zero when zero pins knocked down", () => {
  roll(0);
  expect(game.getScore()).toEqual(0);
});

it("score is equal to knocked down pins", () => {
  roll(3);
  expect(game.getScore()).toEqual(3);
});

it("frame score is sum of two rolls", () => {
  roll(4);
  roll(5);
  expect(game.getScore()).toEqual(9);
});

it("can not roll more than 10 pins in each frame", () => {
  roll(4);
  cannotRoll(8);
  expect(game.getScore()).toEqual(4);
});


it("can again roll up to 10 pins in new frame", () => {
  roll(4);
  roll(5);
  roll(4);
  roll(5);

  expect(() => roll(5)).not.toThrow();
  expect(game.getScore()).toEqual(23);
});

function roll(pins: number) {
  game.roll(pins);
}

function cannotRoll(pins: number) {
  expect(() => roll(pins)).toThrow();

}
