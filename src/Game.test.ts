import { Game } from "./Game";

let game: Game;


beforeEach(() => {
  game = new Game();
});

it("can not roll more than 20 times", () => {
  whenRollsKnockDown(
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1
  );
  thenRollingIsNoLongerAllowed();
});

it.each([
  -1,
  -100,
  11,
  111,
  101234
])
("can not knock down %s pins", (pins: number) => {
  thenRollIsNotAllowed(pins);
});

it.each([
  [1, 10],
  [2, 9],
  [3, 8],
  [4, 7],
  [5, 6],
  [6, 5],
  [7, 4],
  [8, 3],
  [9, 2],
])("can not knock down more than 10 pins in a frame (roll: %s, %s)", (firstRoll: number, secondRoll: number) => {
  whenRollsKnockDown(4, 6, 3, 7, 5, 5, firstRoll);
  thenRollIsNotAllowed(secondRoll);
});

it("score is sum of knocked down pins", () => {
  whenRollsKnockDown(2, 3);
  thenScoreIs(5);
});

it("a spare bonus is next roll's score", () => {
  whenRollsKnockDown(4, 6, 4, 3);
  thenScoreIs(21);
});

it("it is not a spare if less than 10 pins knocked down within a frame", () => {
  whenRollsKnockDown(4, 4, 6, 3);
  thenScoreIs(17);
});

it("a strike bonus is next roll's score", () => {
  whenRollsKnockDown(10, 3);
  thenScoreIs(16);
});

it("can not roll more than 10 frames and strikes count as one frame each", () => {
  whenRollsKnockDown(1, 2, 10, 4, 5, 10, 5, 5, 10, 10, 8, 2, 0, 2, 4, 5);
  thenRollingIsNoLongerAllowed();
});

function whenRollsKnockDown(...pins: number[]) {
  pins.forEach(pin => game.roll(pin));
}

function thenRollingIsNoLongerAllowed() {
  expect(() => game.roll(1)).toThrow();
}

function thenRollIsNotAllowed(pins: number) {
  expect(() => game.roll(pins)).toThrow();
}

function thenScoreIs(expectedScore: number) {
  expect(game.getScore()).toBe(expectedScore);
}
