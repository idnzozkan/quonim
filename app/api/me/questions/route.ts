import Question from '@/models/question'
import { getCurrentUser } from '@/lib/session'
import { UnauthorizedError } from '@/lib/utils/exceptions'

// Since the relevant components are server components we directly query the db
// and therefore we currently do not retrieve the current user's questions
// with this endpoint. Nevertheless, we can use this endpoint in the future
// if we would like to apply a client interacted feature like pagination.
export const GET = async (req: Request) => {
  try {
    const user = await getCurrentUser()

    if (!user) {
      throw new UnauthorizedError()
    }

    const { searchParams } = new URL(req.url)
    const published = searchParams.get('published')

    if (published) {
      const questions = await Question.find({
        to: user?.id,
        answer: {
          $ne: null,
        },
      })

      return new Response(JSON.stringify(questions))
    }

    const questions = await Question.find({
      to: user?.id,
      answer: {
        $eq: null,
      },
    })

    return new Response(JSON.stringify(questions))
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return new Response(error.message, { status: 401 })
    }

    return new Response(null, { status: 500 })
  }
}
