import Link from 'next/link'
import { format } from 'timeago.js'

import { AnswerType, UserType } from 'types'
import styles from './answer.module.scss'
import UserAvatar from '../user-avatar'

interface AnswerProps extends AnswerType {
  user: UserType
}

const Answer = ({ user, text, createdAt }: AnswerProps) => {
  return (
    <>
      <Link href={`/${user.username}`}>
        <UserAvatar
          className={styles.avatar}
          src={user.avatar}
          width={36}
          height={36}
        />
      </Link>
      <div className={styles.answer}>
        <div className={styles.answerInfo}>
          <Link href={`/${user.username}`}>
            <span className={styles.name}>{user.name}</span>
          </Link>
          <div>
            <Link href={`/${user.username}`}>
              <span className={styles.username}>@{user.username}</span>
            </Link>
            <span className={styles.dividerDot}>·</span>
            <time className={styles.timeAgo}>
              {/* TODO: Figure out why the ISO 8601 does not work correctly. */}
              {format(createdAt, 'short')}
            </time>
          </div>
        </div>
        <div className={styles.answerText}>{text}</div>
      </div>
    </>
  )
}

export default Answer
