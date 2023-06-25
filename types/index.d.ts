import { Types } from 'mongoose'

export interface Link {
  title: string
  url: string
}

export interface UserType {
  _id: string
  name: string
  username: string
  email: string
  avatar: string
  bio: string
  links: Link[]
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

export type UserDataType = Pick<UserType, 'name' | 'username' | 'bio' | 'links'>
