import { moveRobot } from './robot'

describe('Testing moveRobot function', () => {
  describe('WHEN moveRobot is called', () => {
    test('GIVEN command is F', () => {
      const results = moveRobot({x: 0, y: 0}, 'F')
      expect(results).toEqual({x: 1, y: 0})
    })

    test('GIVEN command is B', () => {
      const results = moveRobot({x: 0, y: 0}, 'B')
      expect(results).toEqual({x: -1, y: 0})
    })

    test('GIVEN command is L', () => {
      const results = moveRobot({x: 0, y: 0}, 'L')
      expect(results).toEqual({x: 0, y: 1})
    })

    test('GIVEN command is R', () => {
      const results = moveRobot({x: 0, y: 0}, 'R')
      expect(results).toEqual({x: 0, y: -1})
    })

    test('GIVEN command is R AND start position is different', () => {
      const results = moveRobot({x: 3, y: 7}, 'R')
      expect(results).toEqual({x: 3, y: 6})
    })
  })
})
