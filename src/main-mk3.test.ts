import handler from './main-mk3'
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
      expect(handlerErrorTester(coordinatesHelper(0, 0), 'F5L')).toThrow()
      expect(handlerErrorTester(coordinatesHelper(0, 0), '55FF')).toThrow()
      expect(handlerErrorTester(coordinatesHelper(0, 0), 'FFF66L')).toThrow()
    })
  })

  describe('WHEN valid input is used', () => {
    test('GIVEN co-ordinates is (0, 0) and command is `F`', () => {
      expect(handler(coordinatesHelper(0, 0), 'F')).toEqual(coordinatesHelper(1, 0))
    })

    test('GIVEN co-ordinates is (0, 0) and command is `4F`', () => {
      expect(handler(coordinatesHelper(0, 0), '4F')).toEqual(coordinatesHelper(4, 0))
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

    test('GIVEN co-ordinates is (5, 0) and command is `F4F`', () => {
      expect(handler(coordinatesHelper(5, 0), 'F4F')).toEqual(coordinatesHelper(10, 0))
    })

    test('GIVEN co-ordinates is (0, 5) and command is `LF`', () => {
      expect(handler(coordinatesHelper(0, 5), 'LF')).toEqual(coordinatesHelper(0, 6))
    })

    test('GIVEN co-ordinates is (15, 20) and command is `LLL2F`', () => {
      expect(handler(coordinatesHelper(15, 20), 'LLL2F')).toEqual(coordinatesHelper(15, 18))
    })

    test('GIVEN co-ordinates is (99, 199) and command is `RRFLF`', () => {
      expect(handler(coordinatesHelper(99, 199), 'RRFLF')).toEqual(coordinatesHelper(98, 198))
    })

    test('GIVEN co-ordinates is (0, 0) and command is `FFFFFF3FLFFFFFFR5FL`', () => {
      expect(handler(coordinatesHelper(0, 0), 'FFFFFF3FLFFFFFFR5FL')).toEqual(coordinatesHelper(14, 6))
    })

    test('GIVEN co-ordinates is (4, 3) and command is `FFFFFFFF5F R FFFFFF3F R FFFFFF L FFFFF5FFF5FFFFFFFLFFFFF`', () => {
      expect(handler(coordinatesHelper(4, 3), 'FFFFFFFF5FRFFFFFF3FRFFFFFFLFFFFF5FFF5FFFFFFFLFFFFF')).toEqual(coordinatesHelper(11, -8))
    })
  })
})
