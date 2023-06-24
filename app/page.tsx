import styles from './styles.module.scss'
import Masonry from '@/components/core/masonry'
import QuestionAnswerCard from '@/components/custom/question-answer-card'
import SuggestedUsers from '@/components/custom/suggested-users'
import Footer from '@/components/custom/footer'
import PageHeader from '@/components/custom/page-header'
import Question from '@/models/question'
import { getCurrentUser } from '@/lib/session'
import { QuestionType } from '@/types'
import { connectToDB } from '@/lib/db'

export default async function HomePage() {
  const user = await getCurrentUser()
  let questions: QuestionType[] | null

  if (!user) {
    questions = await getPublicQuestions()
  } else {
    const followingIds = user?.following?.map((u) => u._id.toString())
    questions = await getFeedQuestions(followingIds)
  }

  return (
    <div className={styles.container}>
      <aside className={styles.peopleContainer}>
        <div className={styles.people}>
          {/* @ts-expect-error Server Component */}
          <SuggestedUsers />
          <Footer />
        </div>
      </aside>
      <section className={styles.feed}>
        {questions?.length ? (
          <Masonry breakpointColumns={{ default: 2, '1280': 2, '1024': 1 }}>
            {questions.map((question) => (
              <QuestionAnswerCard question={question} key={question._id} />
            ))}
          </Masonry>
        ) : (
          <PageHeader
            title="Uh-oh! Your feed is empty. 👀"
            description="Start following people in complete anonymity. 🕶️"
          />
        )}
      </section>
    </div>
  )
}

async function getPublicQuestions(): Promise<QuestionType[] | null> {
  try {
    await connectToDB()

    const questions = (await Question.find({
      answer: {
        $ne: null,
      },
    })
      .populate(['to', 'answer'])
      .sort({ updatedAt: -1 })) as QuestionType[]

    return questions
  } catch (error) {
    return null
  }
}

async function getFeedQuestions(
  followingIds: string[] | undefined
): Promise<QuestionType[] | null> {
  try {
    await connectToDB()

    const questions = (await Question.find({
      to: {
        $in: followingIds,
      },
      answer: {
        $ne: null,
      },
    })
      .populate(['to', 'answer'])
      .sort({ updatedAt: -1 })) as QuestionType[]

    return questions
  } catch (error) {
    return null
  }
}
