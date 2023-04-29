import React from 'react'

import styles from './question-answer-card.module.scss'
import { Card, CardHeader, CardFooter } from '../../core/card'
import UserAvatar from '../user-avatar'
import { format } from 'timeago.js'
import Link from 'next/link'

interface UserType {
  name: string
  username: string
  avatar: string
}

interface AnswerType {
  text: string
  createdAt: number
}

interface QuestionAnswerCardProps {
  question: {
    id: number
    to: UserType
    text: string
    answer: AnswerType
    createdAt: number
  }
}

const QuestionAnswerCard = ({ question }: QuestionAnswerCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className={styles.questionText}>{question.text}</div>
      </CardHeader>
      <CardFooter>
        <Link href={`/${question.to.username}`}>
          <UserAvatar
            className={styles.avatar}
            src={question.to.avatar}
            width={36}
            height={36}
          />
        </Link>
        <div className={styles.answer}>
          <div className={styles.answerInfo}>
            <Link href={`/${question.to.username}`}>
              <span className={styles.name}>{question.to.name}</span>
            </Link>
            <div>
              <Link href={`/${question.to.username}`}>
                <span className={styles.username}>@{question.to.username}</span>
              </Link>
              <span className={styles.dividerDot}>·</span>
              <time className={styles.timeAgo}>
                {format(question.answer.createdAt, 'short')}
              </time>
            </div>
          </div>
          <div className={styles.answerText}>{question.answer.text}</div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default QuestionAnswerCard
