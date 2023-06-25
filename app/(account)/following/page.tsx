import React from 'react'

import styles from './styles.module.scss'
import PageHeader from '@/components/custom/page-header'
import { Card } from '@/components/core/card'
import User, { UserDocument } from '@/models/user'
import { getCurrentUser } from '@/lib/session'
import { connectToDB } from '@/lib/db'
import { UnauthorizedError } from '@/lib/utils/exceptions'
import FollowUnfollowButton from '@/components/custom/follow-unfollow-button'
import UserAvatar from '@/components/custom/user-avatar'
import Link from 'next/link'

type FollowingUser = Pick<
  UserDocument,
  '_id' | 'name' | 'username' | 'avatar'
> & { totalAnswers: number; totalFollowers: number }

export default async function FollowingPage() {
  const users = await getUsers()

  return (
    <div>
      <PageHeader
        title="Following"
        description={`There are ${users?.length} users in your following list.`}
      />
      <div className={styles.container}>
        {users?.map((user) => (
          <Card key={user._id.toString()}>
            <div className={styles.userContainer}>
              <div className={styles.wrapper}>
                <div className={styles.avatar}>
                  <Link href={`/${user.username}`}>
                    <UserAvatar width={96} height={96} src={user.avatar} />
                  </Link>
                </div>
                <div className={styles.info}>
                  <div className={styles.identity}>
                    <Link href={`/${user.username}`} className={styles.name}>
                      <span>{user.name}</span>
                    </Link>
                    <Link
                      href={`/${user.username}`}
                      className={styles.username}
                    >
                      <span>@{user.username}</span>
                    </Link>
                  </div>
                  <div className={styles.stats}>
                    <span className={styles.answers}>
                      {user.totalAnswers} Answers
                    </span>
                    <div className={styles.divider} />
                    <span className={styles.followers}>
                      {user.totalFollowers} Followers
                    </span>
                  </div>
                </div>
              </div>
              <FollowUnfollowButton user={{ _id: user._id.toString() }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

async function getUsers(): Promise<FollowingUser[] | null> {
  try {
    const authUser = await getCurrentUser()

    if (!authUser) {
      throw new UnauthorizedError()
    }

    await connectToDB()

    const users = (await User.aggregate([
      {
        $match: { _id: { $in: authUser?.following } },
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
        $addFields: {
          totalFollowers: { $size: '$followers' },
        },
      },
      {
        $project: {
          name: 1,
          username: 1,
          avatar: 1,
          totalAnswers: 1,
          totalFollowers: 1,
        },
      },
    ])) as FollowingUser[]

    return users
  } catch (error) {
    return null
  }
}
