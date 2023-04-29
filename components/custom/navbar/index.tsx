import Link from 'next/link'
import clsx from 'clsx'
import { Compass } from 'lucide-react'

import styles from './navbar.module.scss'
import UserAvatar from '../user-avatar'

const Navbar = () => {
  return (
    <header className={clsx(styles.navbar, 'container')}>
      <nav className={styles.wrapper}>
        <Link href="/" className={styles.logo}>
          Quonim
        </Link>
        <Link href="/explore" className={styles.explore}>
          <Compass size={20} />
          Explore
        </Link>
        <div className={styles.avatar}>
          <UserAvatar
            src="https://avatars.githubusercontent.com/u/59365742?v=4"
            width={40}
            height={40}
          />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
