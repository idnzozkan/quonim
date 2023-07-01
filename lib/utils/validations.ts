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
      message: `Question must be a minimum of ${QUESTION_MIN_LENGTH} characters`,
    })
    .max(QUESTION_MAX_LENGTH, {
      message: `Question must be a maximum of ${QUESTION_MAX_LENGTH} characters`,
    }),
})

export const newAnswerSchema = z.object({
  text: z
    .string()
    .trim()
    .min(ANSWER_MIN_LENGTH, {
      message: `Answer must be a minimum of ${ANSWER_MIN_LENGTH} characters`,
    })
    .max(ANSWER_MAX_LENGTH, {
      message: `Answer must be a maximum of ${ANSWER_MAX_LENGTH} characters`,
    }),
})

export const userUpdateSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .min(1)
    .max(64, 'Name must be a maximum of 64 characters'),
  username: z
    .string()
    .nonempty('Username is required')
    .min(1)
    .max(20, 'Username must be a maximum of 20 characters')
    .regex(/^(?!_+$)[a-zA-Z0-9_]{1,20}$/, 'Invalid username'),
  bio: z
    .string()
    .nonempty('Bio is required')
    .min(1)
    .max(260, 'Bio must be a maximum of 260 characters'),
  links: z.array(
    z.object({
      title: z
        .string()
        .nonempty('Title is required')
        .min(1)
        .max(30, 'Title must be a maximum of 30 characters'),
      url: z
        .string()
        .nonempty('URL is required')
        .regex(
          /^(http|https):\/\/([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,}))(:\d+)?(\/[^\s]*)?$/,
          'Invalid URL'
        ),
    })
  ),
})
