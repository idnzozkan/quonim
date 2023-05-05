import styles from './styles.module.scss'
import data from '@/data/feed'
import Masonry from '@/components/core/masonry'
import QuestionAnswerCard from '@/components/custom/question-answer-card'
import SuggestedUsers from '@/components/custom/suggested-users'
import Footer from '@/components/custom/footer'

const HomePage = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.peopleContainer}>
        <div className={styles.people}>
          <SuggestedUsers />
          <Footer />
        </div>
      </aside>
      <section className={styles.feed}>
        <Masonry breakpointColumns={{ default: 2, '1280': 2, '1024': 1 }}>
          {data.map((question) => (
            <QuestionAnswerCard question={question} key={question.id} />
          ))}
        </Masonry>
      </section>
    </div>
  )
}

export default HomePage
