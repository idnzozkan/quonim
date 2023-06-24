'use client'

import React from 'react'
import { signIn } from 'next-auth/react'

import Button from '@/components/core/button'

interface LoginButton {
  text?: string
}

const LoginButton = ({ text }: LoginButton) => {
  return (
    <Button onClick={() => signIn('google')} variant="primary">
      {text ? text : 'Login'}
    </Button>
  )
}

export default LoginButton
