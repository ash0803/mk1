import Joi from 'joi'

export const coordinatesSchema = Joi.object({
  x: Joi.number().required(),
  y: Joi.number().required()
}).required()

export const commandSequenceSchema = Joi
  .string()
  .pattern(new RegExp('^[FBLR]+$'))