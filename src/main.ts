import Joi from 'joi'
import { coordinatesSchema, commandSequenceSchema } from './joi-schemas'
import { commandType, coordinatesType } from './types'
import { moveRobot } from './models/robot'

/**
 * Handler function for accepting starting co-ordinates and a command sequence. This will instruct
 * the robot to follow the commands and report back the final co-ordinates
 * 
 * Example command sequence = FRRRFFFFRFRFFFRFFLRLFFFFLRFF
 *
 * ASSUMPTIONS
 * 1 - Forwards/Backwards is along the x axis
 * 2 - Left / Right is along the y axis
 * 3 - Co-ordinates parameter can be an object of type coordinates
 * 4 - We can just return a coordinates object
 *
 * @param { coordinatesType } - starting location of the robot
 * @param { string } - string containing sequence
 * @returns { coordinatesType }
 */
const handler = (startingCoordinates: coordinatesType, commandSequence: string): coordinatesType => {
  // Validation of input parameters. Assuming that erroring out is ok for now and no need to handle
  Joi.assert(startingCoordinates, coordinatesSchema)
  Joi.assert(commandSequence, commandSequenceSchema)

  // loop through sequence of letters and reduce to a set of final co-ordinates
  const finalCoordinates = commandSequence
    .split('')
    .reduce<coordinatesType>((previousCoordinates, currentCommand) => {
      // note that we could count all of the occurrences of each command instead of looping through
      // each one. Looping through is currently preferred in anticipation of further requirements
      return moveRobot(previousCoordinates, currentCommand as commandType)
    }, startingCoordinates)

  return finalCoordinates
}

export default handler