import React from 'react'

import styles from './styles.module.scss'
import data from '@/data/questions'
import PageHeader from '@/components/custom/page-header'
import QuestionAnswerCard from '@/components/custom/question-answer-card'

const QuestionsPage = () => {
  return (
    <div className={styles.container}>
      <PageHeader
        title="Questions"
        description={`There are ${data.length} questions waiting for your answer.`}
      />
      {data.map((question) => (
        <QuestionAnswerCard question={question} key={question.id} />
      ))}
    </div>
  )
}

export default QuestionsPage
