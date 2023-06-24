import User from '@/models/user'
import { connectToDB } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { UnauthorizedError } from '@/lib/utils/exceptions'

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
      return new Response(error.message, { status: 403 })
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

    const { name, username, bio, links } = await req.json()

    const payload: {
      name?: string
      username?: string
      bio?: string
      links?: string
    } = {}

    if (name) payload.name = name
    if (username) payload.username = username
    if (bio) payload.bio = bio
    if (links) payload.links = links

    const updatedUser = await User.findByIdAndUpdate(user.id, payload, {
      new: true,
    })

    return new Response(JSON.stringify(updatedUser))
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return new Response(error.message, { status: 403 })
    }

    return new Response(null, { status: 500 })
  }
}
