import React from 'react'

import { QuestionType } from 'types'
import styles from './question-answer-card.module.scss'
import { Card, CardHeader, CardFooter } from '../../core/card'
import Answer from '../answer'
import AnswerInput from '../answer-input'

const QuestionAnswerCard = ({ question }: { question: QuestionType }) => {
  return (
    <Card>
      <CardHeader>
        <div className={styles.questionText}>{question.text}</div>
      </CardHeader>
      <CardFooter>
        {question.answer ? (
          <Answer
            user={question.to}
            text={question.answer.text}
            createdAt={question.createdAt}
          />
        ) : (
          <AnswerInput question={{ _id: question._id }} />
        )}
      </CardFooter>
    </Card>
  )
}

export default QuestionAnswerCard
