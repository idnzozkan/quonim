import { Schema, Document, model, models, Model } from 'mongoose'

interface UserDocument extends Document {
  name: string
  username: string
  email: string
  avatar: string
  following: string[]
  bio: string
}

const UserSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
  },
  avatar: {
    type: String,
    required: [true, 'Avatar is required'],
  },
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  bio: {
    type: String,
    default:
      'Hey there! Feel free to share your thoughts, ideas, and questions anonymously with me.',
  },
})

const User: Model<UserDocument> =
  models.User || model<UserDocument>('User', UserSchema)

export default User
