import * as z from 'zod'

import Question from '@/models/question'
import { connectToDB } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { BadRequestError, UnauthorizedError } from '@/lib/utils/exceptions'
import { newQuestionSchema } from '@/lib/utils/validations'

const paramsSchema = z.object({
  userId: z.string(),
})

export const GET = async (
  req: Request,
  { params }: { params: z.infer<typeof paramsSchema> }
) => {
  try {
    const { userId } = paramsSchema.parse(params)

    await connectToDB()

    const questions = await Question.find({
      to: userId,
    })

    return new Response(JSON.stringify(questions))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export const POST = async (
  req: Request,
  { params }: { params: z.infer<typeof paramsSchema> }
) => {
  try {
    const { userId } = paramsSchema.parse(params)

    await connectToDB()

    const user = await getCurrentUser()

    if (!user) {
      throw new UnauthorizedError()
    }

    // People cannot ask a question to themselves.
    if (user.id === userId) {
      throw new BadRequestError()
    }

    const json = await req.json()
    const body = newQuestionSchema.parse(json)

    const question = await Question.create({
      to: userId,
      text: body.text.trim(),
    })

    return new Response(JSON.stringify(question))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof UnauthorizedError) {
      return new Response(error.message, { status: 403 })
    }

    if (error instanceof BadRequestError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(null, { status: 500 })
  }
}
