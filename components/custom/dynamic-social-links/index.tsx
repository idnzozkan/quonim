'use client'

import Button from '@/components/core/button'
import React, { ReactElement } from 'react'

import styles from './dynamic-social-links.module.scss'
import { Icons } from '@/components/support/icons'

type InputElement = ReactElement<React.InputHTMLAttributes<HTMLInputElement>>

interface Link {
  title: string
  url: string
}

interface DynamicSocialLinksProps {
  links: Link[]
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>
  max: number
  children: InputElement[]
  onAdd?: () => void
}

const DynamicSocialLinks = ({
  links,
  setLinks,
  onAdd,
  max,
  children,
}: DynamicSocialLinksProps) => {
  const handleTitleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedLinks = [...links]
    updatedLinks[index].title = e.target.value
    setLinks(updatedLinks)
  }

  const handleURLChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedLinks = [...links]
    updatedLinks[index].url = e.target.value
    setLinks(updatedLinks)
  }

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (onAdd) {
      onAdd()
    }

    const updatedLinks = [...links, { title: '', url: '' }]
    setLinks(updatedLinks)
  }

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault()

    const updatedLinks = [...links]
    updatedLinks.splice(index, 1)
    setLinks(updatedLinks)
  }

  const mapChildComponents = (
    child: InputElement,
    index: number
  ): InputElement | null => {
    const { name } = child.props

    if (name === 'title') {
      return React.cloneElement(child, {
        value: links[index].title,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          handleTitleChange(index, e),
      })
    }

    if (name === 'url') {
      return React.cloneElement(child, {
        value: links[index].url,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          handleURLChange(index, e),
      })
    }

    return null
  }

  const renderLinks = (): React.ReactNode => {
    return links.map((link, index) => {
      return (
        <div className={styles.inputRow} key={index}>
          {children.map((child) => mapChildComponents(child, index))}
          {links.length > 1 && (
            <Button
              onClick={(e) => handleDelete(e, index)}
              variant="outlineDanger"
              size="sm"
            >
              <Icons.Delete size={18} />
            </Button>
          )}
        </div>
      )
    })
  }

  return (
    <div className={styles.container}>
      {renderLinks()}
      {links.length < max && (
        <Button
          onClick={(e) => handleAdd(e)}
          size="sm"
          variant="outline"
          className={styles.addButton}
        >
          Add Link
        </Button>
      )}
    </div>
  )
}

export default DynamicSocialLinks
