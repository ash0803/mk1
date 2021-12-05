import Joi from 'joi'

export const coordinatesSchema = Joi.object({
  x: Joi.number().required(),
  y: Joi.number().required()
}).required()

export const commandSequenceSchema = Joi
  .string()
  .pattern(new RegExp('^[FBLR]+$'))

export const commandSequenceSchemaMK2 = Joi
  .string()
  .pattern(new RegExp('^[FLR]+$'))

export const commandSequenceSchemaMK3 = Joi
  .string()
  .pattern(new RegExp('^(([1-5]{0,1}F)|[LR])+$'))
