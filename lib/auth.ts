import { NextAuthOptions, Session as NextAuthSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { env } from '@/env.mjs'
import { connectToDB } from './db'
import User from '@/models/user'
import generateUsername from './utils/generate-username'

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
            username: user?.name && generateUsername(user.name),
            avatar: user?.image,
          })
        }

        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
  },
}
