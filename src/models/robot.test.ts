import { moveRobot, moveRobotMK2, moveRobotMK3 } from './robot'

const coordinatesHelper = (x: number, y: number) => ({x, y})
const coordinatesHelperMK2 = (x: number, y: number, direction: number) => ({x, y, direction})
const coordinatesHelperMK3 = (
  x: number,
  y: number,
  direction: number,
  fuelRemaining: number,
  boostValue: number
) => (
  {x, y, direction, fuelRemaining, boostValue}
)

describe('Testing moveRobot function', () => {
  describe('WHEN moveRobot is called', () => {
    test('GIVEN command is F', () => {
      const results = moveRobot(coordinatesHelper(0, 0), 'F')
      expect(results).toEqual(coordinatesHelper(1, 0))
    })

    test('GIVEN command is B', () => {
      const results = moveRobot(coordinatesHelper(0, 0), 'B')
      expect(results).toEqual(coordinatesHelper(-1, 0))
    })

    test('GIVEN command is L', () => {
      const results = moveRobot(coordinatesHelper(0, 0), 'L')
      expect(results).toEqual(coordinatesHelper(0, 1))
    })

    test('GIVEN command is R', () => {
      const results = moveRobot(coordinatesHelper(0, 0), 'R')
      expect(results).toEqual(coordinatesHelper(0, -1))
    })

    test('GIVEN command is R AND start position is different', () => {
      const results = moveRobot(coordinatesHelper(3, 7), 'R')
      expect(results).toEqual(coordinatesHelper(3, 6))
    })
  })
})

describe('Testing moveRobotMK2 function', () => {
  describe('WHEN moveRobotMK2 is called', () => {
    test('GIVEN command is F and direction is 0', () => {
      const results = moveRobotMK2(coordinatesHelperMK2(0, 0, 0), 'F')
      expect(results).toEqual(coordinatesHelperMK2(1, 0, 0))
    })

    test('GIVEN command is F and direction is 90 - No move as off the board', () => {
      const results = moveRobotMK2(coordinatesHelperMK2(0, 0, 90), 'F')
      expect(results).toEqual(coordinatesHelperMK2(0, 0, 90))
    })

    test('GIVEN command is F and direction is 180 - No move as off the board', () => {
      const results = moveRobotMK2(coordinatesHelperMK2(0, 0, 180), 'F')
      expect(results).toEqual(coordinatesHelperMK2(0, 0, 180))
    })

    test('GIVEN command is F and direction is 270', () => {
      const results = moveRobotMK2(coordinatesHelperMK2(0, 0, 270), 'F')
      expect(results).toEqual(coordinatesHelperMK2(0, 1, 270))
    })

    test('GIVEN command is F and direction is -90', () => {
      const results = moveRobotMK2(coordinatesHelperMK2(0, 0, -90), 'F')
      expect(results).toEqual(coordinatesHelperMK2(0, 1, -90))
    })

    test('GIVEN command is F and direction is -180 - No move as off the board', () => {
      const results = moveRobotMK2(coordinatesHelperMK2(0, 0, -180), 'F')
      expect(results).toEqual(coordinatesHelperMK2(0, 0, -180))
    })

    test('GIVEN command is F and direction is -270 - No move as off the board', () => {
      const results = moveRobotMK2(coordinatesHelperMK2(0, 0, -270), 'F')
      expect(results).toEqual(coordinatesHelperMK2(0, 0, -270))
    })

    test('GIVEN command is L and direction is 0', () => {
      const results = moveRobotMK2(coordinatesHelperMK2(0, 0, 0), 'L')
      expect(results).toEqual(coordinatesHelperMK2(0, 0, -90))
    })

    test('GIVEN command is L and direction is 180', () => {
      const results = moveRobotMK2(coordinatesHelperMK2(0, 0, 180), 'L')
      expect(results).toEqual(coordinatesHelperMK2(0, 0, 90))
    })

    test('GIVEN command is L and direction is -270', () => {
      const results = moveRobotMK2(coordinatesHelperMK2(0, 0, -270), 'L')
      expect(results).toEqual(coordinatesHelperMK2(0, 0, -360))
    })

    test('GIVEN command is R and direction is 0', () => {
      const results = moveRobotMK2(coordinatesHelperMK2(0, 0, 0), 'R')
      expect(results).toEqual(coordinatesHelperMK2(0, 0, 90))
    })

    test('GIVEN command is R and direction is 180', () => {
      const results = moveRobotMK2(coordinatesHelperMK2(0, 0, 180), 'R')
      expect(results).toEqual(coordinatesHelperMK2(0, 0, 270))
    })

    test('GIVEN command is R and direction is -270', () => {
      const results = moveRobotMK2(coordinatesHelperMK2(0, 0, -270), 'R')
      expect(results).toEqual(coordinatesHelperMK2(0, 0, -180))
    })
  })
})

describe('Testing moveRobotMK3 function', () => {
  describe('WHEN moveRobotMK3 is called', () => {
    test('GIVEN command is F and direction is 0', () => {
      const results = moveRobotMK3(coordinatesHelperMK3(0, 0, 0, 30, 1), 'F')
      expect(results).toEqual(coordinatesHelperMK3(1, 0, 0, 29, 1))
    })

    test('GIVEN command is F and direction is 90', () => {
      const results = moveRobotMK3(coordinatesHelperMK3(0, 0, 90, 30, 1), 'F')
      expect(results).toEqual(coordinatesHelperMK3(0, -1, 90, 29, 1))
    })

    test('GIVEN command is F and direction is 180', () => {
      const results = moveRobotMK3(coordinatesHelperMK3(0, 0, 180, 25, 1), 'F')
      expect(results).toEqual(coordinatesHelperMK3(-1, 0, 180, 24, 1))
    })

    test('GIVEN command is F and direction is 270 and boost value is 2', () => {
      const results = moveRobotMK3(coordinatesHelperMK3(0, 0, 270, 20, 2), 'F')
      expect(results).toEqual(coordinatesHelperMK3(0, 2, 270, 18, 1))
    })

    test('GIVEN command is F and direction is -90 and boost value is 5', () => {
      const results = moveRobotMK3(coordinatesHelperMK3(0, 0, -90, 20, 5), 'F')
      expect(results).toEqual(coordinatesHelperMK3(0, 5, -90, 15, 1))
    })

    test('GIVEN command is F and direction is -180 and no fuel left', () => {
      const results = moveRobotMK3(coordinatesHelperMK3(0, 0, -180, 0, 2), 'F')
      expect(results).toEqual(coordinatesHelperMK3(0, 0, -180, 0, 2))
    })

    test('GIVEN command is F and direction is -270 and only able to move limited steps', () => {
      const results = moveRobotMK3(coordinatesHelperMK3(0, 0, -270, 3, 5), 'F')
      expect(results).toEqual(coordinatesHelperMK3(0, -3, -270, 0, 1))
    })

    test('GIVEN command is L and direction is 0', () => {
      const results = moveRobotMK3(coordinatesHelperMK3(0, 0, 0, 25, 1), 'L')
      expect(results).toEqual(coordinatesHelperMK3(0, 0, -90, 25, 1))
    })

    test('GIVEN command is L and direction is 180', () => {
      const results = moveRobotMK3(coordinatesHelperMK3(0, 0, 180, 25, 1), 'L')
      expect(results).toEqual(coordinatesHelperMK3(0, 0, 90, 25, 1))
    })

    test('GIVEN command is L and direction is -270', () => {
      const results = moveRobotMK3(coordinatesHelperMK3(0, 0, -270, 30, 4), 'L')
      expect(results).toEqual(coordinatesHelperMK3(0, 0, -360, 30, 4))
    })

    test('GIVEN command is R and direction is 0', () => {
      const results = moveRobotMK3(coordinatesHelperMK3(0, 0, 0, 30, 2), 'R')
      expect(results).toEqual(coordinatesHelperMK3(0, 0, 90, 30, 2))
    })

    test('GIVEN command is R and direction is 180', () => {
      const results = moveRobotMK3(coordinatesHelperMK3(0, 0, 180, 5, 1), 'R')
      expect(results).toEqual(coordinatesHelperMK3(0, 0, 270, 5, 1))
    })

    test('GIVEN command is R and direction is -270', () => {
      const results = moveRobotMK3(coordinatesHelperMK3(0, 0, -270, 5, 1), 'R')
      expect(results).toEqual(coordinatesHelperMK3(0, 0, -180, 5, 1))
    })

    test('GIVEN command is 3 and direction is -270', () => {
      const results = moveRobotMK3(coordinatesHelperMK3(0, 0, -270, 20, 1), '3')
      expect(results).toEqual(coordinatesHelperMK3(0, 0, -270, 20, 3))
    })

    test('GIVEN command is 4 and direction is -270', () => {
      const results = moveRobotMK3(coordinatesHelperMK3(0, 0, -270, 4, 1), '4')
      expect(results).toEqual(coordinatesHelperMK3(0, 0, -270, 4, 4))
    })
  })
})