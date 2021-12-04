import { moveRobot, moveRobotMK2 } from './robot'

const coordinatesHelper = (x: number, y: number) => ({x, y})
const coordinatesHelperMK2 = (x: number, y: number, direction: number) => ({x, y, direction})

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