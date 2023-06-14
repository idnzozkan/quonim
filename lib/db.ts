import mongoose from 'mongoose'

import { env } from '@/env.mjs'

let isConnected = false

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    return console.log('MongoDB is already connected')
  }

  try {
    await mongoose.connect(env.MONGODB_URI, {
      dbName: 'quonim',
    })

    isConnected = true

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error)
  }
}
