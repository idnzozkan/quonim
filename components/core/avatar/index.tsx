"use client"

import React from 'react'
import clsx from 'clsx'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import type {
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
} from '@radix-ui/react-avatar'

import styles from './avatar.module.scss'

const Avatar: React.FC<AvatarProps> = ({ className, ...props }) => (
  <AvatarPrimitive.Root
    className={clsx(styles.AvatarRoot, className)}
    {...props}
  />
)

const AvatarImage: React.FC<AvatarImageProps> = ({ className, ...props }) => (
  <AvatarPrimitive.Image
    className={clsx(styles.AvatarRoot, className)}
    {...props}
  />
)

const AvatarFallback: React.FC<AvatarFallbackProps> = ({
  className,
  ...props
}) => (
  <AvatarPrimitive.Fallback
    className={clsx(styles.AvatarRoot, className)}
    {...props}
  />
)

export { Avatar, AvatarImage, AvatarFallback }
