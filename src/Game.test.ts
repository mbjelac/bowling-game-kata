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
  expect(() => game.roll(pins)).toThrow();
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

function whenRollsKnockDown(...pins: number[]) {
  pins.forEach(pin => game.roll(pin));
}

function thenRollingIsNoLongerAllowed() {
  expect(() => game.roll(1)).toThrow();
}

function thenScoreIs(expectedScore: number) {
  expect(game.getScore()).toBe(expectedScore);
}
