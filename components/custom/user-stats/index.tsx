import React from 'react'

import styles from './user-stats.module.scss'
import Button from '@/components/core/button'

const UserStats = () => {
  return (
    <div className={styles.stats}>
      <small>614 answers</small>
      <div className={styles.divider} />
      <small>127 followers</small>
      <div className={styles.divider} />
      <Button variant="primary" size="sm" className={styles.followBtn}>
        Follow
      </Button>
    </div>
  )
}

export default UserStats
