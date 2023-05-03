import React from 'react'

import styles from './styles.module.scss'
import SidebarNav from '@/components/custom/sidebar-nav'

interface AccountPageProps {
  children?: React.ReactNode
}

const AccountPage = ({ children }: AccountPageProps) => {
  return (
    <div className={styles.container}>
      <SidebarNav />
      <section className={styles.content}>{children}</section>
    </div>
  )
}

export default AccountPage
