import React from 'react'

import styles from './suggested-users.module.scss'
import data from '@/data/users'
import UserAvatar from '../user-avatar'
import Button from '@/components/core/button'
import Link from 'next/link'

interface UserProps {
  name: string
  username: string
  avatar: string
  totalAnswers: number
}

const User = ({ name, username, avatar, totalAnswers }: UserProps) => {
  return (
    <div className={styles.user}>
      <div className={styles.userDetails}>
        <Link href={`/${username}`}>
          <UserAvatar
            src={avatar}
            width={36}
            height={36}
            className={styles.avatar}
          />
        </Link>
        <div className={styles.userInfo}>
          <Link href={`/${username}`} className={styles.name}>
            {name}
          </Link>
          <small className={styles.stats}>{totalAnswers} answers</small>
        </div>
      </div>
      <Button variant="primary" size="sm" className={styles.followBtn}>
        Follow
      </Button>
    </div>
  )
}

const SuggestedUsers = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Suggested users</h3>
      <div className={styles.users}>
        {data.map((user) => (
          <User
            key={user.id}
            avatar={user.avatar}
            name={user.name}
            username={user.username}
            totalAnswers={user.totalAnswers}
          />
        ))}
      </div>
    </div>
  )
}

export default SuggestedUsers
