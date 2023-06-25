import { notFound } from 'next/navigation'

import styles from './styles.module.scss'
import QuestionAnswerList from '@/components/custom/question-answer-list'
import UserInformation from '@/components/custom/user-information'
import UserLinks from '@/components/custom/user-links'
import QuestionForm from '@/components/custom/question-form'
import UserStats from '@/components/custom/user-stats'
import { connectToDB } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import User, { UserDocument } from '@/models/user'

interface UserProps {
  params: { username: string }
}
type UserType = Pick<
  UserDocument,
  '_id' | 'name' | 'username' | 'avatar' | 'bio' | 'links'
> & { totalAnswers: number; totalFollowers: number }

export default async function UserPage({ params }: UserProps) {
  const authUser = await getCurrentUser()
  const user = await getUser(params.username)

  if (!user) {
    return notFound()
  }

  return (
    <div className={styles.container}>
      <section className={styles.userDetailsContainer}>
        <div className={styles.userDetails}>
          <UserInformation
            user={{ avatar: user.avatar, name: user.name, bio: user.bio }}
          />
          <UserLinks user={{ links: user.links }} />
          {/* @ts-expect-error Server Component */}
          <UserStats
            user={{
              _id: user._id.toString(),
              totalAnswers: user.totalAnswers,
              totalFollowers: user.totalFollowers,
            }}
          />
        </div>
      </section>
      <section className={styles.questions}>
        {authUser?.id !== user._id.toString() && (
          <QuestionForm
            user={{ _id: user._id.toString(), username: user.username }}
          />
        )}
        {/* @ts-expect-error Server Component */}
        <QuestionAnswerList user={{ _id: user._id.toString() }} />
      </section>
    </div>
  )
}

async function getUser(username: string): Promise<UserType | null> {
  try {
    await connectToDB()

    const user = (
      await User.aggregate([
        {
          $match: { username },
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
            bio: 1,
            links: 1,
            totalAnswers: 1,
            totalFollowers: 1,
          },
        },
      ])
    )[0] as UserType

    return user
  } catch (error) {
    return null
  }
}
