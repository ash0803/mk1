export type coordinatesType = {
  x: number
  y: number
}

export type coordinatesWithDirectionType = coordinatesType & {
  direction: number
}

export type commandType = 'F' | 'B' | 'L' | 'R'

export type commandTypeMK2 = 'F' | 'L' | 'R'
