import React from 'react'

import { UserType } from '@/types'
import styles from './user-stats.module.scss'
import { getCurrentUser } from '@/lib/session'
import FollowUnfollowButton from '../follow-unfollow-button'
import ShareProfileButton from '../share-profile-button'

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
        <ShareProfileButton />
      )}
    </div>
  )
}
