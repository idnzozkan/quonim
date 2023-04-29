import React from 'react'
import clsx from 'clsx'

import styles from './textarea.module.scss'

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => {
  return <textarea className={clsx(className, styles.textarea)} {...props} />
}

export default Textarea
