import { Inter } from 'next/font/google'
import { register } from 'timeago.js'
import { Toaster } from 'react-hot-toast'

import { localeFunc } from '@/lib/timeago'
import Providers from '@/components/support/providers'
import Navbar from '../components/custom/navbar'
import '../styles/reset.scss'
import '../styles/variables.scss'
import '../styles/global.scss'

export const metadata = {
  title: 'Quonim - Anonymous Q&A Network',
  description:
    'Quonim is a social media application where curiosity meets anonymity. Ask anything, anonymously!',
  referrer: 'no-referrer',
}

const inter = Inter({
  subsets: ['latin'],
  preload: true,
  display: 'swap',
})

// Register customized timeago labels
register('short', localeFunc)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <html lang="en" className={inter.className}>
        <body>
          <Toaster position="top-right" />
          {/* @ts-expect-error Server Component */}
          <Navbar />
          <div className="container">
            <main className="wrapper">{children}</main>
          </div>
        </body>
      </html>
    </Providers>
  )
}
