import Joi from 'joi'
import { coordinatesSchema, commandSequenceSchemaMK3 } from './joi-schemas'
import { commandTypeMK3, coordinatesType, coordinatesWithStateType } from './types'
import { moveRobotMK3 } from './models/robot'

/**
 * MK3 Handler function for accepting starting co-ordinates and a command sequence. This will instruct
 * the robot to follow the commands and report back the final co-ordinates.
 * 
 * MK3 now supports 3 commands
 * L (rotate left 90deg)
 * R (rotate right 90deg)
 * F (move forwards)
 *
 * Example command sequence = FRLFFFFLF
 *
 * ASSUMPTIONS
 * 1 - Initial position of robot will always be facing along the positive x axis
 *
 * @param { coordinatesType } - starting location of the robot
 * @param { string } - string containing sequence
 * @returns { coordinatesType }
 */
const handler = (startingCoordinates: coordinatesType, commandSequence: string): coordinatesType => {
  // Validation of input parameters. Assuming that erroring out is ok for now and no need to handle
  Joi.assert(startingCoordinates, coordinatesSchema)
  Joi.assert(commandSequence, commandSequenceSchemaMK3)

  // loop through sequence of letters and reduce to a set of final co-ordinates
  const finalCoordinates = commandSequence
    .split('')
    .reduce<coordinatesWithStateType>((previousCoordinates, currentCommand) => {
      // note that we could count all of the occurrences of each command instead of looping through
      // each one. Looping through is currently preferred in anticipation of further requirements
      return moveRobotMK3(previousCoordinates, currentCommand as commandTypeMK3)
    }, {
      ...startingCoordinates,
      direction: 0,
      fuelRemaining: 30,
      boostValue: 1
    })

  return {
    x: finalCoordinates.x,
    y: finalCoordinates.y
  }
}

export default handler