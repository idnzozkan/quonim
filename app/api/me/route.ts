import User from '@/models/user'
import { connectToDB } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { ConflictError, UnauthorizedError } from '@/lib/utils/exceptions'
import { UserDataType } from '@/types'
import { reservedUsernames } from '@/lib/utils/reserved-usernames'

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

    const { name, username, bio, links }: Partial<UserDataType> =
      await req.json()

    const payload: Partial<UserDataType> = {}

    if (name) payload.name = name
    if (username && user.username !== username) payload.username = username
    if (bio) payload.bio = bio
    if (links) {
      payload.links = links
    }

    // If the user did not set any link but saved other fields
    // we get { title: '', url: '' }.
    // So, we prevent storing blank link objects by extracting them from the array.
    // (We may change this later and prevent it on the client side.)
    if (links?.length) {
      payload.links = links.filter((l) => l.title && l.url)
    }

    if (payload.username) {
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
    if (error instanceof UnauthorizedError) {
      return new Response(error.message, { status: 401 })
    }

    if (error instanceof ConflictError) {
      return new Response(error.message, { status: 409 })
    }

    return new Response(null, { status: 500 })
  }
}
