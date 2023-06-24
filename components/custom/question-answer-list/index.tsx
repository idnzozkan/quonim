import React from 'react'

import styles from './question-answer-list.module.scss'
import QuestionAnswerCard from '../question-answer-card'
import { QuestionType, UserType } from '@/types'
import { connectToDB } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import Question from '@/models/question'

async function getQuestions(id: string): Promise<QuestionType[] | null> {
  try {
    await connectToDB()

    const questions = (await Question.find({
      to: id,
      answer: {
        $ne: null,
      },
    })
      .populate(['to', 'answer'])
      .sort({ updatedAt: -1 })) as QuestionType[]

    return questions
  } catch (error) {
    return null
  }
}

export default async function QuestionAnswerList({
  user,
}: {
  user: Pick<UserType, '_id'>
}) {
  const questions = await getQuestions(user._id)

  return (
    <div className={styles.container}>
      {questions?.map((question) => (
        <QuestionAnswerCard question={question} key={question._id.toString()} />
      ))}
    </div>
  )
}
