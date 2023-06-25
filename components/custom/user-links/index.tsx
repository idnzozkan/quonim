import { Link, UserType } from '@/types'
import styles from './user-links.module.scss'

interface UserLinkProps {
  href: string
  children: string
}

const UserLink = ({ href, children }: UserLinkProps) => {
  return (
    <li className={styles.link}>
      <a href={href} title={children} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </li>
  )
}

const UserLinks = ({ user }: { user: Pick<UserType, 'links'> }) => {
  if (!user.links.length) {
    return null
  }

  return (
    <div>
      <ul className={styles.links}>
        {user.links.map((link: Link, index: number) => (
          <UserLink href={link.url} key={index}>
            {link.title}
          </UserLink>
        ))}
      </ul>
    </div>
  )
}

export default UserLinks
