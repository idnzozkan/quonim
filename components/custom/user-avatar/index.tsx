import React from 'react'
import type { AvatarProps } from '@radix-ui/react-avatar'

import { Avatar, AvatarImage, AvatarFallback } from '../../core/avatar'

interface UserAvatarProps extends AvatarProps {
  src?: string
  width: number
  height: number
}

const UserAvatar = ({ src, width, height, ...props }: UserAvatarProps) => {
  return (
    <Avatar {...props}>
      {src ? (
        <AvatarImage
          src={src}
          width={width}
          height={height}
          alt="User Avatar"
          referrerPolicy="no-referrer"
        ></AvatarImage>
      ) : (
        <AvatarFallback>
          <div>No image</div>
        </AvatarFallback>
      )}
    </Avatar>
  )
}

export default UserAvatar
