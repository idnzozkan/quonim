'use client'

import React from 'react'
import clsx from 'clsx'

import styles from './follow-unfollow-button.module.scss'
import { UserType } from '@/types'
import Button from '@/components/core/button'
import { useSession } from 'next-auth/react'

interface FollowUnfollowButtonProps {
  isFollowing?: boolean
  user: Pick<UserType, '_id'>
  className?: string
}

export default function FollowUnfollowButton({
  user,
  className,
}: FollowUnfollowButtonProps) {
  const { update, data } = useSession()
  const [hovered, setHovered] = React.useState<boolean>(false)
  const [disabled, setDisabled] = React.useState<boolean>(false)

  const isFollowing = data?.user.following?.some(
    (u) => u.toString() === user?._id.toString()
  )

  return (
    <>
      {isFollowing ? (
        <Button
          onClick={async () => {
            setDisabled(true)
            await unfollowUser(user._id)
            await update()
            setDisabled(false)
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          variant={hovered ? 'outlineDanger' : 'outline'}
          size="sm"
          className={clsx(styles.button, className)}
          disabled={disabled}
        >
          {hovered ? 'Unfollow' : 'Following'}
        </Button>
      ) : (
        <Button
          onClick={async () => {
            setDisabled(true)
            await followUser(user._id)
            await update()
            setDisabled(false)
          }}
          variant="primary"
          size="sm"
          className={clsx(styles.button, className)}
          disabled={disabled}
        >
          Follow
        </Button>
      )}
    </>
  )
}

// TODO: Use SWR for updating the buttons immediately whenever making an HTTP request.
// @see: https://swr.vercel.app/

async function followUser(userId: string) {
  const response = await fetch(`/api/users/${userId}/follow`, {
    method: 'PATCH',
  })

  if (!response?.ok) {
    return null
  }

  return true
}

async function unfollowUser(userId: string) {
  const response = await fetch(`/api/users/${userId}/unfollow`, {
    method: 'PATCH',
  })

  if (!response?.ok) {
    return null
  }

  return true
}
