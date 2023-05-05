import Link from 'next/link'
import { format } from 'timeago.js'

import { UserType } from 'types'
import styles from './answer.module.scss'
import UserAvatar from '../user-avatar'

interface AnswerProps {
  recipient: UserType
  text: string
  createdAt: number
}

const Answer = ({ recipient, text, createdAt }: AnswerProps) => {
  return (
    <>
      <Link href={`/${recipient.username}`}>
        <UserAvatar
          className={styles.avatar}
          src={recipient.avatar}
          width={36}
          height={36}
        />
      </Link>
      <div className={styles.answer}>
        <div className={styles.answerInfo}>
          <Link href={`/${recipient.username}`}>
            <span className={styles.name}>{recipient.name}</span>
          </Link>
          <div>
            <Link href={`/${recipient.username}`}>
              <span className={styles.username}>@{recipient.username}</span>
            </Link>
            <span className={styles.dividerDot}>·</span>
            <time className={styles.timeAgo}>{format(createdAt, 'short')}</time>
          </div>
        </div>
        <div className={styles.answerText}>{text}</div>
      </div>
    </>
  )
}

export default Answer
