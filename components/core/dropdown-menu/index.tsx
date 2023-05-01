'use client'

import React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import type {
  DropdownMenuProps,
  DropdownMenuTriggerProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuSeparatorProps,
  DropdownMenuArrowProps,
} from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import styles from './dropdown-menu.module.scss'

const DropdownMenu: React.FC<DropdownMenuProps> = DropdownMenuPrimitive.Root

const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> =
  DropdownMenuPrimitive.Trigger

const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
  className,
  sideOffset = 5,
  ...props
}) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={clsx(className, styles.content)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

const DropdownMenuItem: React.FC<
  DropdownMenuItemProps & { bold?: boolean }
> = ({ className, bold, ...props }) => {
  return (
    <DropdownMenuPrimitive.Item
      data-bold={bold}
      className={clsx(className, styles.item)}
      {...props}
    />
  )
}

const DropdownMenuSeparator: React.FC<
  DropdownMenuSeparatorProps & { darker?: boolean }
> = ({ className, darker, ...props }) => {
  return (
    <DropdownMenuPrimitive.Separator
      data-darker={darker}
      className={clsx(className, styles.separator)}
      {...props}
    />
  )
}

const DropdownMenuArrow: React.FC<DropdownMenuArrowProps> = ({
  className,
  ...props
}) => {
  return (
    <DropdownMenuPrimitive.Arrow
      className={clsx(className, styles.arrow)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuArrow,
}
