import React from 'react'

import { UserType } from '@/types'
import styles from './user-stats.module.scss'
import FollowUnfollowButton from '../follow-unfollow-button'
import { getCurrentUser } from '@/lib/session'
import Button from '@/components/core/button'
import { Icons } from '@/components/support/icons'

interface UserStatsProps {
  user: Pick<UserType, '_id'> & { totalAnswers: number; totalFollowers: number }
}

export default async function UserStats({ user }: UserStatsProps) {
  const authUser = await getCurrentUser()

  return (
    <div className={styles.stats}>
      <small>{user.totalAnswers} answers</small>
      <div className={styles.divider} />
      <small>{user.totalFollowers} followers</small>
      <div className={styles.divider} />
      {user._id !== authUser?.id ? (
        <FollowUnfollowButton user={{ _id: user._id }} />
      ) : (
        <Button variant="primary" size="sm" className={styles.shareProfile}>
          <Icons.Share size={16} />
          Share Profile
        </Button>
      )}
    </div>
  )
}
