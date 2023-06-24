import { z } from 'zod'

import User from '@/models/user'
import { connectToDB } from '@/lib/db'
import { NotFoundError } from '@/lib/utils/exceptions'

const paramsSchema = z.object({
  userId: z.string(),
})

export const GET = async (
  req: Request,
  { params }: { params: z.infer<typeof paramsSchema> }
) => {
  try {
    await connectToDB()

    const user = await User.findById(params.userId)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    // TODO: Do not send sensitive data to the client

    return new Response(JSON.stringify(user))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof NotFoundError) {
      return new Response(error.message, { status: 404 })
    }

    return new Response(null, { status: 500 })
  }
}
