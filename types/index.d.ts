export interface UserType {
  name: string
  username: string
  avatar: string
}

export interface AnswerType {
  text: string
  createdAt: number
}

export interface QuestionType {
  id: number
  to: UserType
  text: string
  answer: AnswerType | null
  createdAt: number
}
