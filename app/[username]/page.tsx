import { notFound } from 'next/navigation'

import styles from './styles.module.scss'
import QuestionAnswerList from '@/components/custom/question-answer-list'
import UserInformation from '@/components/custom/user-information'
import UserLinks from '@/components/custom/user-links'
import QuestionForm from '@/components/custom/question-form'
import UserStats from '@/components/custom/user-stats'
import { connectToDB } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import User from '@/models/user'

interface UserProps {
  params: { username: string }
}

const UserPage = async ({ params }: UserProps) => {
  await connectToDB()

  const authUser = await getCurrentUser()
  const user = await User.findOne({ username: params.username })

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
          <UserStats user={{ _id: user._id.toString() }} />
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

export default UserPage
