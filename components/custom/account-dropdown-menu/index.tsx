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
import { signOut } from 'next-auth/react'
import { UserType } from '@/types'

const AccountDropdownMenu = ({
  user,
}: {
  user: Pick<UserType, 'username' | 'avatar'>
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          src={user.avatar}
          width={40}
          height={40}
          className={styles.avatar}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div>
          <DropdownMenuItem asChild>
            <Link href={`/${user.username}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/questions">Questions</Link>
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
            <Link href="#" onClick={() => signOut()}>
              Logout
            </Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountDropdownMenu
