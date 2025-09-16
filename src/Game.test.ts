import { Game } from "./Game";

let game: Game;
beforeEach(() => {
  game = new Game();
})

it.each([
  [1, 2, 3],
  [3, 4, 7],
  [0, 0, 0]
])('rolling %s and %s should give score of %s',
  (firstRoll,
   secondRoll,
   expectedScore) => {
    rolled(firstRoll, secondRoll)

    expect(game.getScore()).toEqual(expectedScore)
  })

it.each([-1, -1000, 11, 800])
('rolling %s is not possible',
  (numberOfKnockedDownPins) => {
    rollThrows(numberOfKnockedDownPins)
  })

it("can not roll more than 20 times", () => {
  rolled(
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
  )

  rollThrows(1)
});

it("can not knock down more than 10 pins within a frame", () => {

  rolled(4)

  rollThrows(7)
})


it('score is sum of knocked down pins in all frames', () => {
  rolled(4, 2, 3, 6, 0)

  expect(game.getScore()).toEqual(15)
})


it('bonus score for a spare is the next roll',
  () => {
    rolled(4, 6, 2)
    expect(game.getScore()).toEqual(14)
  })

it('spare in last frame allows bonus roll', () => {
  rolled(0, 0,
    0, 0,
    0, 0,
    0, 0,
    0, 0,
    0, 3,
    0, 0,
    0, 0,
    0, 0,
    6, 4,
  )
  rolled(2)
  expect(game.getScore()).toEqual(17)
})

it('spare in last frame allows only one bonus roll', () => {
  rolled(0, 0,
    0, 0,
    0, 0,
    0, 0,
    0, 0,
    0, 0,
    0, 0,
    0, 0,
    0, 0,
    6, 4,
    2
  )

  rollThrows(4)
})

function rolled(...pins: number[]) {
  pins.forEach(pin => game.roll(pin))
}

function rollThrows(numberOfKnockedDownPins: number) {
  expect(() => game.roll(numberOfKnockedDownPins)).toThrow()
}
