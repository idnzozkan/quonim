'use client'

import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import styles from './settings-form.module.scss'
import { userUpdateSchema } from '@/lib/utils/validations'
import { Icons } from '@/components/support/icons'
import Input from '@/components/core/input'
import Button from '@/components/core/button'
import Textarea from '@/components/core/textarea'
import Label from '@/components/core/label'
import DynamicSocialLinks from '@/components/custom/dynamic-social-links'
import FormInputError from '@/components/custom/form-input-error'

type UserDataType = z.infer<typeof userUpdateSchema>

interface SettingsFormProps {
  user: UserDataType
}

const SettingsForm = ({ user }: SettingsFormProps) => {
  const [saving, setSaving] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserDataType>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: user.name || '',
      username: user.username || '',
      bio: user.bio || '',
      links: user.links || [],
    },
  })

  const onSubmit = async (data: UserDataType) => {
    setSaving(true)

    const response = await fetch('/api/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response?.ok) {
      setSaving(false)

      if (response.status === 409) {
        return toast.error('Username is already taken.')
      }

      return toast.error('Something went wrong.')
    }

    toast.success('Your changes saved.')
    setSaving(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <div className={styles.personalInformation}>
          <div>
            <Label htmlFor="name">Display Name</Label>
            <Input className={styles.input} id="name" {...register('name')} />
            {errors?.name && <FormInputError message={errors?.name?.message} />}
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              className={styles.input}
              id="username"
              {...register('username')}
            />
            {errors?.username && (
              <FormInputError message={errors?.username?.message} />
            )}
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              className={styles.textarea}
              id="bio"
              {...register('bio')}
            />
            {errors?.bio && <FormInputError message={errors?.bio?.message} />}
          </div>
          <div>
            <Label htmlFor="links">Social Links</Label>
            <DynamicSocialLinks
              register={register}
              errors={errors}
              control={control}
            />
          </div>
        </div>
        <div className={styles.accountDetails}>
          {/* TODO: Add other settings such as visibility, delete account, dark mode, etc. */}
        </div>
        <Button disabled={saving} className={styles.saveBtn} variant="primary">
          {saving ? (
            <Icons.Spinner size={18} className="spinner" />
          ) : (
            <Icons.Save size={18} />
          )}
          {saving ? 'Saving' : 'Save'}
        </Button>
      </form>
    </>
  )
}

export default SettingsForm
