import { z } from 'zod'

import User from '@/models/user'
import { connectToDB } from '@/lib/db'
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '@/lib/utils/exceptions'
import { getCurrentUser } from '@/lib/session'

const paramsSchema = z.object({
  userId: z.string(),
})

export const PATCH = async (
  req: Request,
  { params }: { params: z.infer<typeof paramsSchema> }
) => {
  try {
    const { userId } = paramsSchema.parse(params)

    await connectToDB()

    const authUser = await getCurrentUser()

    if (!authUser) {
      throw new UnauthorizedError()
    }

    if (authUser.id === userId) {
      throw new BadRequestError()
    }

    const userToUnfollow = await User.findById(userId)
    const authUserFromDB = await User.findById(authUser.id)

    if (!userToUnfollow || !authUserFromDB) {
      throw new NotFoundError('User not found')
    }

    if (
      !authUserFromDB.following.some((u) => u._id.equals(userToUnfollow._id))
    ) {
      throw new BadRequestError()
    }

    authUserFromDB.following = authUserFromDB.following?.filter(
      (u) => u._id.toString() !== userToUnfollow._id.toString()
    )
    userToUnfollow.followers = userToUnfollow.followers?.filter(
      (u) => u._id.toString() !== authUserFromDB._id.toString()
    )

    await authUserFromDB.save()
    await userToUnfollow.save()

    return new Response(JSON.stringify(authUserFromDB))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof UnauthorizedError) {
      return new Response(error.message, { status: 401 })
    }

    if (error instanceof BadRequestError) {
      return new Response(error.message, { status: 400 })
    }

    if (error instanceof NotFoundError) {
      return new Response(error.message, { status: 404 })
    }

    return new Response(null, { status: 500 })
  }
}
