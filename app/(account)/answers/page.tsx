import React from 'react'

import styles from './styles.module.scss'
import data from '@/data/profile'
import PageHeader from '@/components/custom/page-header'
import QuestionAnswerCard from '@/components/custom/question-answer-card'

const AnswersPage = () => {
  return (
    <div className={styles.container}>
      <PageHeader
        title="Answers"
        description={`You have answered ${data.length} questions.`}
      />
      {data.map((question) => (
        <QuestionAnswerCard question={question} key={question.id} />
      ))}
    </div>
  )
}

export default AnswersPage
