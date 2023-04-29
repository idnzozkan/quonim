import { Inter } from 'next/font/google'
import { register } from 'timeago.js'

import { localeFunc } from '@/lib/timeago.js'
import Navbar from '../components/custom/navbar'
import '../styles/reset.scss'
import '../styles/variables.scss'
import '../styles/global.scss'

export const metadata = {
  title: 'Quonim - Anonymous Q&A Platform',
  description:
    'Quonim is a social media application where curiosity meets anonymity. Ask anything, anonymously!',
}

const inter = Inter({
  subsets: ['latin'],
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
    <html lang="en" className={inter.className}>
      <body>
        <Navbar />
        <div className="container">
          <main className="wrapper">{children}</main>
        </div>
      </body>
    </html>
  )
}
