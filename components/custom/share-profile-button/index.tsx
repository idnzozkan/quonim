'use client'

import React, { useState } from 'react'

import styles from './share-profile-button.module.scss'
import { Icons } from '@/components/support/icons'
import Button from '@/components/core/button'
import { toast } from 'react-hot-toast'

// TODO: Open a modal and show a few social media apps to share the profile.
const ShareProfileButton = () => {
  async function handleClick() {
    await navigator.clipboard.writeText(window.location.href)
    toast.success('Your profile link has been copied!')
  }

  return (
    <Button
      onClick={handleClick}
      variant="primary"
      size="sm"
      className={styles.shareProfile}
    >
      <Icons.Share size={16} />
      Share Profile
    </Button>
  )
}

export default ShareProfileButton
