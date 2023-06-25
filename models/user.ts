import { Link } from '@/types'
import { Document, Model, Schema, Types, model, models } from 'mongoose'

export interface UserDocument extends Document {
  _id: Types.ObjectId
  name: string
  username: string
  email: string
  avatar: string
  following: UserDocument[]
  followers: UserDocument[]
  bio: string
  links: Link[]
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
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  bio: {
    type: String,
    default:
      'Hey there! Feel free to send your thoughts, ideas, and questions anonymously to me on my Quonim profile.',
  },
  links: [
    {
      title: String,
      url: String,
    },
  ],
})

const User: Model<UserDocument> =
  models?.User || model<UserDocument>('User', UserSchema)

export default User
