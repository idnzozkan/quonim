import React from 'react'

import { UserType } from '@/types'
import styles from './user-stats.module.scss'
import FollowUnfollowButton from '../follow-unfollow-button'
import { getCurrentUser } from '@/lib/session'
import Button from '@/components/core/button'
import { Icons } from '@/components/support/icons'

interface UserStatsProps {
  user: Pick<UserType, '_id'>
}

export default async function UserStats({ user }: UserStatsProps) {
  const authUser = await getCurrentUser()
  const isFollowing = authUser?.following?.some(
    (u) => u._id.toString() === user?._id.toString()
  )

  return (
    <div className={styles.stats}>
      <small>614 answers</small>
      <div className={styles.divider} />
      <small>127 followers</small>
      <div className={styles.divider} />
      {user._id !== authUser?.id ? (
        <FollowUnfollowButton
          user={{ _id: user._id }}
          isFollowing={isFollowing}
        />
      ) : (
        <Button variant="primary" size="sm" className={styles.shareProfile}>
          <Icons.Share size={16} />
          Share Profile
        </Button>
      )}
    </div>
  )
}
