import styles from './user-information.module.scss'
import UserAvatar from '../user-avatar'

const UserInformation = () => {
  return (
    <div>
      <UserAvatar
        src="https://avatars.githubusercontent.com/u/59365742?v=4"
        width={184}
        height={184}
      />
      <div className={styles.name}>Deniz Ozkan</div>
      <p className={styles.bio}>
        I am a lifelong student who tries to be a better version of himself
        every day. I enjoy working on front-end and back-end engineering, and I
        am highly passionate about turning difficult problems and creative ideas
        into things that live on the internet.
      </p>
    </div>
  )
}

export default UserInformation
