import Link from 'next/link'
import clsx from 'clsx'
import { Compass } from 'lucide-react'

import styles from './navbar.module.scss'
import AccountDropdownMenu from '../account-dropdown-menu'

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
        <div className={styles.account}>
          <AccountDropdownMenu />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
