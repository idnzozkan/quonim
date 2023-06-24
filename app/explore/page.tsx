import React from 'react'

import Masonry from '@/components/core/masonry'
import QuestionAnswerCard from '@/components/custom/question-answer-card'
import { QuestionType } from '@/types'
import { connectToDB } from '@/lib/db'
import Question from '@/models/question'

async function getQuestions(): Promise<QuestionType[] | null> {
  try {
    await connectToDB()

    const questions = (await Question.find({
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

export default async function ExplorePage() {
  const questions = await getQuestions()

  return (
    <Masonry breakpointColumns={{ default: 3, '1280': 2, '1024': 1 }}>
      {questions?.map((question) => (
        <QuestionAnswerCard question={question} key={question._id} />
      ))}
    </Masonry>
  )
}
