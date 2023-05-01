'use client'

import React from 'react'
import Link from 'next/link'

import styles from './account-dropdown-menu.module.scss'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/core/dropdown-menu'
import UserAvatar from '@/components/custom/user-avatar'

const AccountDropdownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          src="https://avatars.githubusercontent.com/u/59365742?v=4"
          width={40}
          height={40}
          className={styles.avatar}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div>
          <DropdownMenuItem asChild bold className={styles.link}>
            <Link href="/questions">Questions (7)</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/answers">Answers</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/people">People</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator darker />
          <DropdownMenuItem asChild>
            <Link href="/logout">Logout</Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountDropdownMenu
