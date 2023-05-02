import Link from 'next/link'
import clsx from 'clsx'

import styles from './navbar.module.scss'
import { Icons } from '@/components/core/icons'
import AccountDropdownMenu from '../account-dropdown-menu'

const Navbar = () => {
  return (
    <header className={clsx(styles.navbar, 'container')}>
      <nav className={styles.wrapper}>
        <Link href="/" className={styles.logo}>
          Quonim
        </Link>
        <Link href="/explore" className={styles.explore}>
          <Icons.Explore size={20} />
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
