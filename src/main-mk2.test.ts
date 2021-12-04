import handler from './main-mk2'
import { coordinatesType } from './types'

describe('Testing handler', () => {
  const handlerErrorTester = (coordinates: coordinatesType, commandSequence: string) => () => {
    handler(coordinates, commandSequence)
  }

  const coordinatesHelper = (x: number, y: number) => ({x, y})

  describe('WHEN invalid input is used', () => {
    test('GIVEN co-ordinates is of the wrong format', () => {
      // @ts-expect-error - Prevent type checking for testing purposes
      expect(handlerErrorTester({}, 'FFRR')).toThrow()
      // @ts-expect-error - Prevent type checking for testing purposes
      expect(handlerErrorTester({ z: 0 }, 'FFRR')).toThrow()
      // @ts-expect-error - Prevent type checking for testing purposes
      expect(handlerErrorTester({ x: '123', y: 'x', direction: 123 }, 'FFRR')).toThrow()
      // @ts-expect-error - Prevent type checking for testing purposes
      expect(handlerErrorTester({ x: 'd' }, 'FFRR')).toThrow()
    })

    test('GIVEN commandSequence is of the wrong format', () => {
      expect(handlerErrorTester(coordinatesHelper(0, 0), '123')).toThrow()
      expect(handlerErrorTester(coordinatesHelper(0, 0), '')).toThrow()
      expect(handlerErrorTester(coordinatesHelper(0, 0), 'XYZ')).toThrow()
      expect(handlerErrorTester(coordinatesHelper(0, 0), 'FB123')).toThrow()
      expect(handlerErrorTester(coordinatesHelper(0, 0), 'FB')).toThrow()
    })
  })

  describe('WHEN valid input is used', () => {
    test('GIVEN co-ordinates is (0, 0) and command is `F`', () => {
      expect(handler(coordinatesHelper(0, 0), 'F')).toEqual(coordinatesHelper(1, 0))
    })

    test('GIVEN co-ordinates is (0, 0) and command is `L`', () => {
      expect(handler(coordinatesHelper(0, 0), 'L')).toEqual(coordinatesHelper(0, 0))
    })

    test('GIVEN co-ordinates is (0, 0) and command is `R`', () => {
      expect(handler(coordinatesHelper(0, 0), 'R')).toEqual(coordinatesHelper(0, 0))
    })

    test('GIVEN co-ordinates is (5, 0) and command is `FF`', () => {
      expect(handler(coordinatesHelper(5, 0), 'FF')).toEqual(coordinatesHelper(7, 0))
    })

    test('GIVEN co-ordinates is (0, 5) and command is `LF`', () => {
      expect(handler(coordinatesHelper(0, 5), 'LF')).toEqual(coordinatesHelper(0, 6))
    })

    test('GIVEN co-ordinates is (15, 20) and command is `LLLFF`', () => {
      expect(handler(coordinatesHelper(15, 20), 'LLLFF')).toEqual(coordinatesHelper(15, 18))
    })

    test('GIVEN co-ordinates is (99, 199) and command is `RRFLF`', () => {
      expect(handler(coordinatesHelper(99, 199), 'RRFLF')).toEqual(coordinatesHelper(98, 198))
    })

    test('GIVEN co-ordinates is (0, 0) and command is `FRRRFFFFRFRFFFRFFLRLFFFFLRFF`', () => {
      expect(handler(coordinatesHelper(0, 0), 'FRRRFFFFRFRFFFRFFLRLFFFFLRFF')).toEqual(coordinatesHelper(0, 0))
    })

    test('GIVEN co-ordinates is (0, 0) and command is `FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF`', () => {
      expect(handler(coordinatesHelper(0, 0), 'FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF')).toEqual(coordinatesHelper(0, 5))
    })

    test('GIVEN co-ordinates is (3, 6) and command is `FFFFFFFFRRRRRRRFFFFLLLRRRRRLLLLLLLLLRFFF`', () => {
      expect(handler(coordinatesHelper(3, 6), 'FFFFFFFFRRRRRRRFFFFLLLRRRRRLLLLLLLLLRFFF')).toEqual(coordinatesHelper(11, 7))
    })

    test('GIVEN co-ordinates is (0, 7) and command is `RRRRRRRRFFFFFFFFFFFLLLRRRLLLLLFFLR`', () => {
      expect(handler(coordinatesHelper(0, 7), 'RRRRRRRRFFFFFFFFFFFLLLRRRLLLLLFFLR')).toEqual(coordinatesHelper(11, 9))
    })
  })
})
