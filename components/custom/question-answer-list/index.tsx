import React from 'react'

import data from '@/data/profile'
import styles from './question-answer-list.module.scss'
import QuestionAnswerCard from '../question-answer-card'

const QuestionAnswerList = () => {
  return (
    <div className={styles.container}>
      {data.map((question) => (
        <QuestionAnswerCard question={question} key={question.id} />
      ))}
    </div>
  )
}

export default QuestionAnswerList
