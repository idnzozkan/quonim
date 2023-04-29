import React from 'react'
import clsx from 'clsx'

import styles from './card.module.scss'

const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return <div className={clsx(className, styles.container)} {...props} />
}

const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return <div className={clsx(className, styles.header)} {...props} />
}

const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return <div className={clsx(className, styles.footer)} {...props} />
}

export { Card, CardHeader, CardFooter }
