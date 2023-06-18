import { Document, Model, Schema, Types, model, models } from 'mongoose'

import { QUESTION_MAX_LENGTH, QUESTION_MIN_LENGTH } from '@/lib/utils/constants'
import { AnswerType, UserType } from '@/types'

export interface QuestionDocument extends Document {
  to: Types.ObjectId | UserType
  text: string
  answer?: Types.ObjectId | AnswerType
  createdAt: Date
}

const QuestionSchema = new Schema<QuestionDocument>(
  {
    to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Question is required'],
      minlength: QUESTION_MIN_LENGTH,
      maxlength: QUESTION_MAX_LENGTH,
    },
    answer: {
      type: Schema.Types.ObjectId,
      ref: 'Answer',
    },
  },
  {
    timestamps: true,
  }
)

const Question: Model<QuestionDocument> =
  models.Question || model<QuestionDocument>('Question', QuestionSchema)

export default Question
