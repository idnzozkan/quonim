'use client'

import React, { useState } from 'react'

import styles from './question-form.module.scss'
import { QUESTION_CHAR_LIMIT } from '../../../lib/utils/constants'
import { Icons } from '@/components/core/icons'
import Textarea from '@/components/core/textarea'
import Button from '@/components/core/button'

const QuestionForm = () => {
  const [question, setQuestion] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!question.length) {
      return
    }

    setQuestion('')
  }

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value)
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.container}>
      <h3 className={styles.title}>
        Ask <strong>@deniz</strong> anonymously
      </h3>
      <Textarea
        maxLength={QUESTION_CHAR_LIMIT}
        value={question}
        onChange={(e) => handleTyping(e)}
        placeholder="Type your question"
        className={styles.questionBox}
      />
      <div className={styles.information}>
        <p>Note: Your question will be listed once it has been answered.</p>
        <span>
          {question.length}/{QUESTION_CHAR_LIMIT}
        </span>
      </div>
      <Button className={styles.askBtn}>
        <Icons.Send size={18} />
        Send
      </Button>
    </form>
  )
}

export default QuestionForm
