'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'

interface ProvidersProps {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
  )
}

export default Providers
