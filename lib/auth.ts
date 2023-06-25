import { NextAuthOptions, Session as NextAuthSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { nanoid } from 'nanoid'

import { env } from '@/env.mjs'
import { connectToDB } from './db'
import User from '@/models/user'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const user = await User.findOne({ email: session.user?.email })

      if (!session.user) {
        return session
      }

      session.user.id = user?._id.toString()
      session.user.username = user?.username
      session.user.name = user?.name
      session.user.bio = user?.bio
      session.user.links = user?.links
      session.user.following = user?.following

      return session
    },
    async signIn({ user }) {
      try {
        await connectToDB()

        const isUserExist = await User.findOne({ email: user?.email })

        if (!isUserExist) {
          await User.create({
            name: user?.name,
            email: user?.email,
            username: nanoid(10),
            avatar: user?.image?.split('=s96-c')[0], // removed the scaling parameter from the URL
          })
        }

        return true
      } catch (error) {
        return false
      }
    },
  },
  debug: true,
}
