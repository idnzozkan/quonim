import React from 'react'
import Link from 'next/link'

import styles from './footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <nav className={styles.links}>
        <Link href="#" className={styles.link}>
          Terms of Use
        </Link>
        <span className={styles.divider}>·</span>
        <Link href="#" className={styles.link}>
          Privacy
        </Link>
        <span className={styles.divider}>·</span>
        <Link href="#" className={styles.link}>
          FAQ
        </Link>
        <span className={styles.divider}>·</span>
        <Link href="#" className={styles.link}>
          About
        </Link>
      </nav>
      <p className={styles.copyright}>
        Copyright &copy; 2023 <strong>Quonim</strong>
      </p>
    </footer>
  )
}

export default Footer
