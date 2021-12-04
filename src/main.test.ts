import handler from './main'
import { coordinatesType } from './types'

const coordinatesHelper = (x: number, y: number) => ({x, y})

describe('Testing handler', () => {
  const handlerErrorTester = (coordinates: coordinatesType, commandSequence: string) => () => {
    handler(coordinates, commandSequence)
  }

  describe('WHEN invalid input is used', () => {
    test('GIVEN co-ordinates is of the wrong format', () => {
      // @ts-expect-error - Prevent type checking for testing purposes
      expect(handlerErrorTester({}, 'FBFB')).toThrow()
      // @ts-expect-error - Prevent type checking for testing purposes
      expect(handlerErrorTester({ z: 0 }, 'FBFB')).toThrow()
      // @ts-expect-error - Prevent type checking for testing purposes
      expect(handlerErrorTester({ x: '123', y: 'x' }, 'FBFB')).toThrow()
      // @ts-expect-error - Prevent type checking for testing purposes
      expect(handlerErrorTester({ x: 'd' }, 'FBFB')).toThrow()
    })

    test('GIVEN commandSequence is of the wrong format', () => {
      expect(handlerErrorTester(coordinatesHelper(0, 0), '123')).toThrow()
      expect(handlerErrorTester(coordinatesHelper(0, 0), '')).toThrow()
      expect(handlerErrorTester(coordinatesHelper(0, 0), 'XYZ')).toThrow()
      expect(handlerErrorTester(coordinatesHelper(0, 0), 'FB123')).toThrow()
      expect(handlerErrorTester(coordinatesHelper(0, 0), 'FFFX')).toThrow()
    })
  })

  describe('WHEN valid input is used', () => {
    test('GIVEN co-ordinates is (0, 0) and command is `F`', () => {
      expect(handler(coordinatesHelper(0, 0), 'F')).toEqual(coordinatesHelper(1, 0))
    })

    test('GIVEN co-ordinates is (0, 0) and command is `B`', () => {
      expect(handler(coordinatesHelper(0, 0), 'B')).toEqual(coordinatesHelper(-1, 0))
    })

    test('GIVEN co-ordinates is (0, 0) and command is `L`', () => {
      expect(handler(coordinatesHelper(0, 0), 'L')).toEqual(coordinatesHelper(0, 1))
    })

    test('GIVEN co-ordinates is (0, 0) and command is `R`', () => {
      expect(handler(coordinatesHelper(0, 0), 'R')).toEqual(coordinatesHelper(0, -1))
    })

    test('GIVEN co-ordinates is (5, 0) and command is `FF`', () => {
      expect(handler(coordinatesHelper(5, 0), 'FF')).toEqual(coordinatesHelper(7, 0))
    })

    test('GIVEN co-ordinates is (0, 5) and command is `BF`', () => {
      expect(handler(coordinatesHelper(0, 5), 'BF')).toEqual(coordinatesHelper(0, 5))
    })

    test('GIVEN co-ordinates is (15, 20) and command is `LLLB`', () => {
      expect(handler(coordinatesHelper(15, 20), 'LLLB')).toEqual(coordinatesHelper(14, 23))
    })

    test('GIVEN co-ordinates is (99, 199) and command is `BRBRFL`', () => {
      expect(handler(coordinatesHelper(99, 199), 'BRBRFL')).toEqual(coordinatesHelper(98, 198))
    })

    test('GIVEN co-ordinates is (0, 0) and command is `FRRRFFFFRFRFFFRFFLRLFFFFLRFF`', () => {
      expect(handler(coordinatesHelper(0, 0), 'FRRRFFFFRFRFFFRFFLRLFFFFLRFF')).toEqual(coordinatesHelper(17, -5))
    })

    test('GIVEN co-ordinates is (0, 0) and command is `FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF`', () => {
      expect(handler(coordinatesHelper(0, 0), 'FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF')).toEqual(coordinatesHelper(21, 1))
    })

    test('GIVEN co-ordinates is (3, 6) and command is `FFFFFFFFRRRRRRRFFFFLLLBBRRRRRLLLLLLLLLRFFF`', () => {
      expect(handler(coordinatesHelper(3, 6), 'FFFFFFFFRRRRRRRFFFFLLLBBRRRRRLLLLLLLLLRFFF')).toEqual(coordinatesHelper(16, 5))
    })

    test('GIVEN co-ordinates is (0, 7) and command is `RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR`', () => {
      expect(handler(coordinatesHelper(0, 7), 'RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR')).toEqual(coordinatesHelper(8, 4))
    })
  })
})