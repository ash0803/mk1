import { commandType, coordinatesType } from '../types'

/**
 * Calculate the new coordinates based on the command issued
 * @param { coordinatesType } - current coordinates
 * @param { commandType } - Single character command
 * @returns { coordinatesType }
 */
export const moveRobot = (coordinates: coordinatesType, command: commandType) => {
  switch(command) {
    case 'F':
      coordinates.x++
      break
    case 'B':
      coordinates.x--
      break
    case 'L':
      coordinates.y++
      break
    case 'R':
      coordinates.y--
      break
  }

  return coordinates
}
