'use client'

import { useState } from 'react'

import styles from './answer-input.module.scss'
import { ANSWER_CHAR_LIMIT } from '@/lib/utils/constants'
import { Icons } from '@/components/core/icons'
import Button from '@/components/core/button'
import Textarea from '@/components/core/textarea'

const AnswerInput = () => {
  const [answer, setAnswer] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!answer.length) {
      return
    }

    setAnswer('')
  }

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value)
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={styles.answerInputContainer}
    >
      <Textarea
        maxLength={ANSWER_CHAR_LIMIT}
        value={answer}
        onChange={(e) => handleTyping(e)}
        placeholder="Type your answer"
        className={styles.answerInput}
      />
      <div className={styles.answerInputInformation}>
        <span>
          {answer.length}/{ANSWER_CHAR_LIMIT}
        </span>
        <Button variant="primary" size="sm" className={styles.answerBtn}>
          <Icons.Reply size={16} />
          Reply
        </Button>
      </div>
    </form>
  )
}

export default AnswerInput
