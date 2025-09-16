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
  canRoll(10);
});

it("score is zero when zero pins knocked down", () => {
  roll(0);
  expect(game.getScore()).toEqual(0);
});

it("score is zero when zero pins knocked down twice", () => {
  roll(0, 0);
  expect(game.getScore()).toEqual(0);
});

it("score is equal to knocked down pins", () => {
  roll(3);
  expect(game.getScore()).toEqual(3);
});

it("frame score is sum of two rolls", () => {
  roll(4, 5);
  expect(game.getScore()).toEqual(9);
});

it("can not roll more than 10 pins in each frame", () => {
  roll(4);
  cannotRoll(8);
  expect(game.getScore()).toEqual(4);
});


it("can again roll up to 10 pins in new frame", () => {
  roll(4, 5, 4, 5);
  canRoll(5);
  expect(game.getScore()).toEqual(23);
});

it("empty rolls also count towards frame", () => {
  roll(0,6);
  canRoll(7);
});

it("spare bonus is the number of points of next roll", () => {
  roll(5, 5, 3);
  expect(game.getScore()).toEqual(16);
});

it("spare applied only for first roll", () => {
  roll(5, 5, 3, 4);
  expect(game.getScore()).toEqual(20);
});

it("spare not counted in pin frame limit", () => {
  roll(5, 5, 3, 5);
  expect(game.getScore()).toEqual(21);
});

function roll(...rolls: number[]) {
  rolls.forEach(pins => game.roll(pins));
}

function cannotRoll(pins: number) {
  expect(() => roll(pins)).toThrow();

}

function canRoll(pins: number) {
  expect(() => roll(pins)).not.toThrow();
}
