import { Model, Schema, Types, model, models } from 'mongoose'

import { ANSWER_MAX_LENGTH, ANSWER_MIN_LENGTH } from '@/lib/utils/constants'

interface AnswerDocument extends Document {
  question: Types.ObjectId
  text: string
}

const AnswerSchema = new Schema<AnswerDocument>(
  {
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
    },
    text: {
      type: String,
      required: [true, 'Answer is required'],
      minlength: ANSWER_MIN_LENGTH,
      maxlength: ANSWER_MAX_LENGTH,
    },
  },
  {
    timestamps: true,
  }
)

console.log('models.Answer', models.Answer)

const Answer: Model<AnswerDocument> =
  models.Answer || model<AnswerDocument>('Answer', AnswerSchema)

export default Answer
