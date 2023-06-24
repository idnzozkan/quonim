import React from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import clsx from 'clsx'

import styles from './button.module.scss'

const button = cva(styles.base, {
  variants: {
    variant: {
      default: styles.default,
      primary: styles.primary,
      outline: styles.outline,
      danger: styles.danger,
      outlineDanger: styles.outlineDanger,
    },
    size: {
      default: styles.md,
      sm: styles.sm,
      md: styles.md,
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button className={clsx(button({ variant, size, className }))} {...props} />
  )
}

export default Button
