import React from 'react'

import styles from './page-header.module.scss'

interface PageHeaderProps {
  title: string
  description?: string
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}

export default PageHeader
