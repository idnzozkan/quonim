import * as z from 'zod'

import User from '@/models/user'
import { connectToDB } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { ConflictError, UnauthorizedError } from '@/lib/utils/exceptions'
import { reservedUsernames } from '@/lib/utils/reserved-usernames'
import { userUpdateSchema } from '@/lib/utils/validations'

export const GET = async () => {
  try {
    await connectToDB()

    const user = await getCurrentUser()

    if (!user) {
      throw new UnauthorizedError()
    }

    return new Response(JSON.stringify(user))
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return new Response(error.message, { status: 401 })
    }

    return new Response(null, { status: 500 })
  }
}

export const PATCH = async (req: Request) => {
  try {
    await connectToDB()

    const user = await getCurrentUser()

    if (!user) {
      throw new UnauthorizedError()
    }

    const body = await req.json()
    const payload = userUpdateSchema.parse(body)

    if (payload.username && user.username !== payload.username) {
      const isReserved = reservedUsernames.some((u) => u === payload.username)
      const userExistWithTheUsername = await User.findOne({
        username: payload.username,
      })

      if (userExistWithTheUsername || isReserved) {
        throw new ConflictError('Username is already taken.')
      }
    }

    const updatedUser = await User.findByIdAndUpdate(user.id, payload, {
      new: true,
    })

    return new Response(JSON.stringify(updatedUser))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof UnauthorizedError) {
      return new Response(error.message, { status: 401 })
    }

    if (error instanceof ConflictError) {
      return new Response(error.message, { status: 409 })
    }

    return new Response(null, { status: 500 })
  }
}
