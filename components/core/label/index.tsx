import React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'

import styles from './label.module.scss'
import clsx from 'clsx'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = ({ className, ...props }: LabelProps) => {
  return (
    <LabelPrimitive.Root className={clsx(className, styles.label)} {...props} />
  )
}

export default Label
