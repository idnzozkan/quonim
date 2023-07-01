'use client'

import React from 'react'
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from 'react-hook-form'
import * as z from 'zod'

import styles from './dynamic-social-links.module.scss'
import { userUpdateSchema } from '@/lib/utils/validations'
import { MAX_USER_LINKS } from '@/lib/utils/constants'
import { Icons } from '@/components/support/icons'
import Button from '@/components/core/button'
import Input from '@/components/core/input'
import FormInputError from '../form-input-error'

type UserDataType = z.infer<typeof userUpdateSchema>
interface DynamicSocialLinksProps {
  register: UseFormRegister<UserDataType>
  errors: FieldErrors<UserDataType>
  control: Control<UserDataType>
  onAdd?: () => void
}

const DynamicSocialLinks = ({
  register,
  errors,
  control,
  onAdd,
}: DynamicSocialLinksProps) => {
  const { fields, append, remove } = useFieldArray({
    name: 'links',
    control,
  })

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (onAdd) onAdd()

    append({ title: '', url: '' })
  }

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault()

    remove(index)
  }

  const renderLinks = (): React.ReactNode => {
    return fields.map((link, index) => {
      return (
        <div className={styles.inputRow} key={link.id}>
          <div>
            <Input
              type="text"
              className={styles.input}
              {...register(`links.${index}.title`)}
            />
            <FormInputError
              message={errors?.links?.[index]?.title?.message}
              key={index}
            />
          </div>
          <div>
            <Input
              type="text"
              className={styles.input}
              {...register(`links.${index}.url`)}
            />
            <FormInputError
              message={errors?.links?.[index]?.url?.message}
              key={index}
            />
          </div>
          <Button
            onClick={(e) => handleDelete(e, index)}
            variant="outlineDanger"
            size="sm"
          >
            <Icons.Delete size={18} />
          </Button>
        </div>
      )
    })
  }

  return (
    <div className={styles.container}>
      {renderLinks()}
      {fields.length < MAX_USER_LINKS && (
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
