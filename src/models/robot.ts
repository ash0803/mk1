import { commandType, commandTypeMK2, commandTypeMK3, coordinatesType, coordinatesWithDirectionType, coordinatesWithStateType } from '../types'

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

const directionMapping = [
  { x: 1, y: 0 }, // 0 degrees
  { x: 0, y: -1 }, // 90 degrees
  { x: -1, y: 0}, // 180 degrees
  { x: 0, y: 1}, // 270 degrees
]

/**
 * Calculate the new coordinates based on the command issued
 * @param { coordinatesType } - current coordinates
 * @param { commandType } - Single character command
 * @returns { coordinatesType }
 */
export const moveRobotMK2 = (coordinates: coordinatesWithDirectionType, command: commandTypeMK2) => {
  const normalisedDirection = normalisedDirectionCalculator(coordinates.direction)

  switch(command) {
    case 'L':
      coordinates.direction -= 90
      break
    case 'R':
      coordinates.direction += 90
      break
    case 'F':
      // skip command if negative values
      if (
        coordinates.x + directionMapping[normalisedDirection / 90].x < 0 ||
        coordinates.y + directionMapping[normalisedDirection / 90].y < 0
      ) {
        return coordinates
      }

      coordinates.x += directionMapping[normalisedDirection / 90].x
      coordinates.y += directionMapping[normalisedDirection / 90].y
  }

  return coordinates
}

/**
 * Calculate the new coordinates based on the command issued
 * @param { coordinatesType } - current coordinates
 * @param { commandType } - Single character command
 * @returns { coordinatesType }
 */
 export const moveRobotMK3 = (coordinates: coordinatesWithStateType, command: commandTypeMK3) => {
  const normalisedDirection = normalisedDirectionCalculator(coordinates.direction)

  if (command === 'L') {
    coordinates.direction -= 90
  } else if (command === 'R') {
    coordinates.direction += 90
  } else if (command === 'F') {
    // if no fuel left don't do anything
    if (coordinates.fuelRemaining === 0) {
      return coordinates
    }

    // if not enough fuel to finish the move adjust the boost value
    if (coordinates.boostValue > coordinates.fuelRemaining) {
      coordinates.boostValue = coordinates.fuelRemaining
    }

    coordinates.x += (directionMapping[normalisedDirection / 90].x) * coordinates.boostValue
    coordinates.y += (directionMapping[normalisedDirection / 90].y) * coordinates.boostValue

    coordinates.fuelRemaining = coordinates.fuelRemaining - coordinates.boostValue
    coordinates.boostValue = 1
  } else {
    coordinates.boostValue = parseInt(command)
  }

  return coordinates
}

/**
 * Returns normalised rotation value in degrees
 * Examples: 90 -> 90, 540 -> 180, -90 -> 270
 * @param {number} direction - Number degrees in multiples of 90
 */
 const normalisedDirectionCalculator = (direction: number) => {
  const multiplesOf90 = direction / 90
  const modulo4 = multiplesOf90 % 4

  if (modulo4 === 0) {
    return 0
  }

  if (direction > -1) {
    return modulo4 * 90
  }

  return 360 - (-modulo4 * 90)
}