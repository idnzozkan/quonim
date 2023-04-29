import styles from './styles.module.scss'
import QuestionAnswerList from '../../components/custom/question-answer-list'
import UserInformation from '../../components/custom/user-information'
import UserLinks from '../../components/custom/user-links'
import QuestionForm from '../../components/custom/question-form'
import UserStats from '@/components/custom/user-stats'

interface UserProps {
  params: { username: string }
}

const User = ({ params }: UserProps) => {
  return (
    <div className={styles.container}>
      <section className={styles.userDetailsContainer}>
        <div className={styles.userDetails}>
          <UserInformation />
          <UserLinks />
          <UserStats />
        </div>
      </section>
      <section className={styles.questions}>
        <QuestionForm />
        <QuestionAnswerList />
      </section>
    </div>
  )
}

export default User
