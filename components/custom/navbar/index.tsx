import Link from 'next/link'
import clsx from 'clsx'

import styles from './navbar.module.scss'
import { getCurrentUser } from '@/lib/session'
import { Icons } from '@/components/support/icons'
import AccountDropdownMenu from '../account-dropdown-menu'
import LoginButton from '@/components/custom/login-button'

const Navbar = async () => {
  const user = await getCurrentUser()

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
          {user ? (
            <AccountDropdownMenu
              user={{ avatar: user.image || '', username: user.username || '' }}
            />
          ) : (
            <LoginButton />
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
