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

const UserLinks = () => {
  return (
    <div>
      <ul className={styles.links}>
        <UserLink href="#">GitHub</UserLink>
        <UserLink href="#">Twitter</UserLink>
        <UserLink href="#">LinkedIn</UserLink>
        <UserLink href="#">Website</UserLink>
      </ul>
    </div>
  )
}

export default UserLinks
