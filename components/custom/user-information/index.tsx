import styles from './user-information.module.scss'
import UserAvatar from '../user-avatar'
import { UserType } from '@/types'

const UserInformation = ({
  user,
}: {
  user: Pick<UserType, 'avatar' | 'name' | 'bio'>
}) => {
  return (
    <div className={styles.container}>
      <UserAvatar src={user.avatar} width={184} height={184} />
      <div className={styles.name}>{user.name}</div>
      <p className={styles.bio}>{user.bio}</p>
    </div>
  )
}

export default UserInformation
