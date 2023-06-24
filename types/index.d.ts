import { Types } from 'mongoose'

export interface UserType {
  _id: string
  name: string
  username: string
  email: string
  avatar: string
  bio: string
  links: [
    {
      title: string
      url: string
    }
  ]
  following: UserType[]
}

export interface AnswerType {
  text: string
  createdAt: Date
}

export interface QuestionType {
  _id: string
  to: UserType
  text: string
  answer?: AnswerType
  createdAt: Date
}
