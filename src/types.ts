export type coordinatesType = {
  x: number
  y: number
}

export type coordinatesWithDirectionType = coordinatesType & {
  direction: number
}

export type coordinatesWithStateType = coordinatesWithDirectionType & {
  fuelRemaining: number
  boostValue: number
}

export type commandType = 'F' | 'B' | 'L' | 'R'

export type commandTypeMK2 = 'F' | 'L' | 'R'

export type commandTypeMK3 = 'F' | 'L' | 'R' | '1' | '2' | '3' | '4' | '5'
 