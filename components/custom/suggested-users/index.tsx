import React from 'react'

import styles from './suggested-users.module.scss'
import UserAvatar from '../user-avatar'
import Link from 'next/link'
import FollowUnfollowButton from '../follow-unfollow-button'
import User from '@/models/user'
import { UserType } from '@/types'
import { getCurrentUser } from '@/lib/session'

type SuggestedUserType = Pick<
  UserType,
  '_id' | 'name' | 'username' | 'avatar'
> & {
  totalAnswers: number
}

type SuggestedUsersType = SuggestedUserType[]

export default async function SuggestedUsers() {
  const users = await getUsers()

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Suggested users</h3>
      <div className={styles.users}>
        {users?.map((user) => (
          <UserRow
            key={user._id}
            _id={user._id}
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

function UserRow({
  _id,
  name,
  username,
  avatar,
  totalAnswers,
}: SuggestedUserType) {
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
      <FollowUnfollowButton
        user={{ _id: _id.toString() }}
        className={styles.followBtn}
      />
    </div>
  )
}

// TODO: Separate the rest of the code from this file.

async function getUsers(): Promise<SuggestedUsersType | null> {
  const match: { username?: {} } = {}

  const authUser = await getCurrentUser()

  if (authUser) {
    match.username = { $ne: authUser?.username }
  }

  const users = (await User.aggregate([
    {
      $match: match,
    },
    {
      $sample: {
        size: 6,
      },
    },
    {
      $lookup: {
        from: 'questions',
        localField: '_id',
        foreignField: 'to',
        pipeline: [
          {
            $match: {
              answer: { $ne: null },
            },
          },
        ],
        as: 'questions',
      },
    },
    {
      $addFields: {
        totalAnswers: { $size: '$questions' },
      },
    },
    {
      $project: {
        name: 1,
        username: 1,
        avatar: 1,
        totalAnswers: 1,
      },
    },
    {
      $sort: {
        totalAnswers: -1,
      },
    },
  ])) as SuggestedUsersType

  return users
}
