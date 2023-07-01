import React from 'react'

import styles from './styles.module.scss'
import PageHeader from '@/components/custom/page-header'
import QuestionAnswerCard from '@/components/custom/question-answer-card'
import { QuestionType } from '@/types'
import { getCurrentUser } from '@/lib/session'
import { UnauthorizedError } from '@/lib/utils/exceptions'
import { connectToDB } from '@/lib/db'
import Question from '@/models/question'

export default async function QuestionsPage() {
  const questions = await getQuestions()

  return (
    <div className={styles.container}>
      <PageHeader
        title="Questions"
        description={`There are ${questions?.length} questions waiting for your answer.`}
      />
      {questions?.map((question) => (
        <QuestionAnswerCard
          question={{
            _id: question._id.toString(),
            to: question.to,
            text: question.text,
            answer: question.answer,
            createdAt: question.createdAt,
          }}
          key={question._id}
        />
      ))}
    </div>
  )
}

async function getQuestions(): Promise<QuestionType[] | null> {
  try {
    await connectToDB()

    const user = await getCurrentUser()

    if (!user) {
      throw new UnauthorizedError()
    }

    const questions = (await Question.find({
      to: user?.id,
      answer: null,
    }).sort({ createdAt: -1 })) as QuestionType[]

    return questions
  } catch (error) {
    return null
  }
}
