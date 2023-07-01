'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import * as z from 'zod'

import { UserType } from '@/types'
import styles from './question-form.module.scss'
import { Icons } from '@/components/support/icons'
import Textarea from '@/components/core/textarea'
import Button from '@/components/core/button'
import { newQuestionSchema } from '@/lib/utils/validations'
import { QUESTION_MAX_LENGTH, QUESTION_MIN_LENGTH } from '@/lib/utils/constants'

type FormData = z.infer<typeof newQuestionSchema>

const QuestionForm = ({
  user,
}: {
  user: Pick<UserType, '_id' | 'username'>
}) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(newQuestionSchema),
  })
  const watchText = watch('text')

  async function onSubmit(d: FormData) {
    const response = await fetch(`/api/users/${user._id}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: d.text,
      }),
    })

    if (!response.ok) {
      if (response.status === 401) {
        return toast.error('Please log in first.')
      }

      return toast.error('Your question was not sent. Please try again.')
    }

    toast.success('Your question has been sent.')
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <h3 className={styles.title}>
        Ask <strong>@{user.username}</strong> anonymously
      </h3>
      <Textarea
        maxLength={QUESTION_MAX_LENGTH}
        placeholder="Type your question"
        className={styles.questionBox}
        {...register('text')}
      />
      <div className={styles.information}>
        <p>Note: Your question will be listed once it has been answered.</p>
        <span>
          {watchText?.length || 0}/{QUESTION_MAX_LENGTH}
        </span>
      </div>
      <Button
        disabled={
          isSubmitting ||
          !watchText ||
          watchText.trim().length < QUESTION_MIN_LENGTH
        }
        className={styles.askBtn}
      >
        {isSubmitting ? (
          <Icons.Spinner size={18} className="spinner" />
        ) : (
          <Icons.Send size={18} />
        )}
        Send
      </Button>
    </form>
  )
}

export default QuestionForm
