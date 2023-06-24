import { z } from 'zod'

import Question from '@/models/question'
import Answer from '@/models/answer'
import { getCurrentUser } from '@/lib/session'
import { connectToDB } from '@/lib/db'
import {
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
} from '@/lib/utils/exceptions'
import { newAnswerSchema } from '@/lib/utils/validations'
import { AnswerType } from '@/types'

const paramsSchema = z.object({
  questionId: z.string(),
})

export const POST = async (
  req: Request,
  { params }: { params: z.infer<typeof paramsSchema> }
) => {
  try {
    const { questionId } = paramsSchema.parse(params)

    await connectToDB()

    const user = await getCurrentUser()
    const question = await Question.findById(questionId)

    if (!user) {
      throw new UnauthorizedError()
    }

    if (!question) {
      throw new NotFoundError()
    }

    // People cannot answer a question that is asked to someone else.
    if (question?.to.toString() !== user.id) {
      throw new BadRequestError()
    }

    const json = await req.json()
    const body = newAnswerSchema.parse(json)

    const answer = (await Answer.create({
      question: question._id,
      text: body.text.trim(),
    })) as unknown as AnswerType

    question.answer = answer
    await question.save()

    return new Response(JSON.stringify(answer))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof UnauthorizedError) {
      return new Response(error.message, { status: 403 })
    }

    if (error instanceof NotFoundError) {
      return new Response(error.message, { status: 404 })
    }

    if (error instanceof BadRequestError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(null, { status: 500 })
  }
}
