import * as z from 'zod'

import {
  ANSWER_MAX_LENGTH,
  ANSWER_MIN_LENGTH,
  QUESTION_MAX_LENGTH,
  QUESTION_MIN_LENGTH,
} from './constants'

export const newQuestionSchema = z.object({
  text: z
    .string()
    .trim()
    .min(QUESTION_MIN_LENGTH, {
      message: `Question must be a minimum of ${QUESTION_MIN_LENGTH} characters.`,
    })
    .max(QUESTION_MAX_LENGTH, {
      message: `Question must be a maximum of ${QUESTION_MAX_LENGTH} characters.`,
    }),
})

export const newAnswerSchema = z.object({
  text: z
    .string()
    .trim()
    .min(ANSWER_MIN_LENGTH, {
      message: `Answer must be a minimum of ${ANSWER_MIN_LENGTH} characters.`,
    })
    .max(ANSWER_MAX_LENGTH, {
      message: `Answer must be a maximum of ${ANSWER_MAX_LENGTH} characters.`,
    }),
})
