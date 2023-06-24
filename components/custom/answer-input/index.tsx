'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Toaster, toast } from 'react-hot-toast'

import styles from './answer-input.module.scss'
import { Icons } from '@/components/support/icons'
import Button from '@/components/core/button'
import Textarea from '@/components/core/textarea'
import { ANSWER_MAX_LENGTH, ANSWER_MIN_LENGTH } from '@/lib/utils/constants'
import { newAnswerSchema } from '@/lib/utils/validations'
import { QuestionType } from '@/types'
import { useRouter } from 'next/navigation'

type FormData = z.infer<typeof newAnswerSchema>

const AnswerInput = ({ question }: { question: Pick<QuestionType, '_id'> }) => {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(newAnswerSchema),
  })
  const watchText = watch('text')
  const router = useRouter()

  async function onSubmit(d: FormData) {
    const response = await fetch(`/api/questions/${question._id}/answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: d.text,
      }),
    })

    if (!response.ok) {
      return toast.error('Your answer was not published. Please try again.')
    }

    router.refresh()
    reset()
    toast.success('Your answer has been published.')
  }

  return (
    <>
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.answerInputContainer}
      >
        <Textarea
          maxLength={ANSWER_MAX_LENGTH}
          placeholder="Type your answer"
          className={styles.answerInput}
          {...register('text')}
        />
        <div className={styles.answerInputInformation}>
          <span>
            {watchText?.length || 0}/{ANSWER_MAX_LENGTH}
          </span>
          <Button
            disabled={
              isSubmitting ||
              !watchText ||
              watchText.trim().length < ANSWER_MIN_LENGTH
            }
            variant="primary"
            size="sm"
            className={styles.answerBtn}
          >
            {isSubmitting ? (
              <Icons.Spinner size={18} className="spinner" />
            ) : (
              <Icons.Reply size={16} />
            )}
            Reply
          </Button>
        </div>
      </form>
    </>
  )
}

export default AnswerInput
