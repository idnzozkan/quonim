'use client'

import React from 'react'
import MasonryCSS from 'react-masonry-css'
import clsx from 'clsx'

import styles from './masonry.module.scss'

interface MasonryProps extends React.PropsWithChildren {
  className?: string
  breakpointColumns: {
    default: number
    '1280': number
    '1024': number
  }
}

const Masonry: React.FC<MasonryProps> = ({
  className,
  breakpointColumns,
  ...props
}) => {
  return (
    <MasonryCSS
      breakpointCols={breakpointColumns}
      className={clsx(className, styles.grid)}
      columnClassName={styles.gridColumn}
      {...props}
    />
  )
}

export default Masonry
