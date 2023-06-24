import NextAuth, { DefaultSession } from 'next-auth'
import { UserDocument } from '@/models/user'
import { Types } from 'mongoose'

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id?: string
      username?: string
      following?: UserDocument[] | Types.ObjectId[]
    }
  }
}
