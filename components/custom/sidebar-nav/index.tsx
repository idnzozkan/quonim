'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import styles from './sidebar-nav.module.scss'
import { Icons, Icon } from '@/components/support/icons'

const items = [
  {
    title: 'Questions',
    href: '/questions',
    icon: <Icons.Questions size={20} />,
  },
  {
    title: 'Answers',
    href: '/answers',
    icon: <Icons.Answers size={20} />,
  },
  {
    title: 'People',
    href: '/people',
    icon: <Icons.People size={20} />,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <Icons.Settings size={20} />,
  },
]

interface SidebarNavItemProps {
  title: string
  href: string
  icon: React.ReactElement<Icon>
}

const SidebarNavItem = ({ title, href, icon }: SidebarNavItemProps) => {
  const pathname = usePathname()

  const isActive = React.useMemo(() => {
    return pathname === href
  }, [pathname])

  return (
    <Link
      href={href}
      className={clsx(styles.link, { [styles.active]: isActive })}
    >
      {icon}
      {title}
    </Link>
  )
}

const SidebarNav = () => {
  return (
    <aside className={styles.sidebarContainer}>
      <nav className={styles.navigation}>
        {items.map((item, index) => (
          <SidebarNavItem
            title={item.title}
            icon={item.icon}
            href={item.href}
            key={index}
          />
        ))}
      </nav>
    </aside>
  )
}

export default SidebarNav
