import React from 'react'

import styles from './styles.module.scss'
import { QuestionType } from '@/types'
import PageHeader from '@/components/custom/page-header'
import QuestionAnswerCard from '@/components/custom/question-answer-card'
import { getCurrentUser } from '@/lib/session'
import { UnauthorizedError } from '@/lib/utils/exceptions'
import { connectToDB } from '@/lib/db'
import Question from '@/models/question'

async function getQuestions(): Promise<QuestionType[] | null> {
  try {
    await connectToDB()

    const user = await getCurrentUser()

    if (!user) {
      throw new UnauthorizedError()
    }

    const questions = (await Question.find({
      to: user?.id,
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

export default async function AnswersPage() {
  const questions = await getQuestions()

  return (
    <div className={styles.container}>
      <PageHeader
        title="Answers"
        description={`You have answered ${questions?.length} questions.`}
      />
      {questions?.map((question) => (
        <QuestionAnswerCard question={question} key={question._id.toString()} />
      ))}
    </div>
  )
}
