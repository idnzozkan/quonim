'use client'

import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useSession } from 'next-auth/react'

import { Link, UserDataType } from '@/types'
import styles from './styles.module.scss'
import PageHeader from '@/components/custom/page-header'
import Input from '@/components/core/input'
import Button from '@/components/core/button'
import Textarea from '@/components/core/textarea'
import Label from '@/components/core/label'
import { Icons } from '@/components/support/icons'
import DynamicSocialLinks from '@/components/custom/dynamic-social-links'

const defaultUserData: UserDataType = {
  name: '',
  username: '',
  bio: '',
  links: [{ title: '', url: '' }],
}

const SettingsPage = () => {
  const { data, update } = useSession()

  const [userData, setUserData] = useState<UserDataType>(defaultUserData)
  const [links, setLinks] = useState<Link[]>(userData.links)

  const [saving, setSaving] = useState<boolean>(false)

  useEffect(() => {
    if (!data?.user) {
      return
    }

    setUserData({
      name: data.user.name!,
      username: data.user.username!,
      bio: data.user.bio!,
      links: data.user.links!.length ? data.user.links! : defaultUserData.links,
    })

    setLinks(data.user.links!.length ? data.user.links! : defaultUserData.links)
  }, [data?.user])

  useEffect(() => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      links,
    }))
  }, [links])

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name } = e.target

    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: e.target.value,
    }))
  }

  // TODO: Add validations
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)

    const response = await fetch('/api/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response?.ok) {
      setSaving(false)
      if (response.status === 409) {
        return toast.error('Username is already taken.')
      }
      return toast.error('Something went wrong.')
    }

    toast.success('Your changes saved.')
    update()
    setSaving(false)
  }

  return (
    <>
      <PageHeader title="Settings" />
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.personalInformation}>
          <div>
            <Label htmlFor="name">Display Name</Label>
            <Input
              onChange={handleInputChange}
              value={userData.name}
              className={styles.input}
              id="name"
              name="name"
            />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              onChange={handleInputChange}
              value={userData.username}
              className={styles.input}
              id="username"
              name="username"
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              onChange={handleInputChange}
              value={userData.bio}
              className={styles.textarea}
              id="bio"
              name="bio"
            />
          </div>
          <div>
            <Label htmlFor="links">Social Links</Label>
            <DynamicSocialLinks links={links} setLinks={setLinks} max={5}>
              <Input
                id="links"
                type="text"
                name="title"
                placeholder="Title"
                className={styles.input}
              />
              <Input
                type="text"
                name="url"
                placeholder="URL"
                className={styles.input}
              />
            </DynamicSocialLinks>
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

export default SettingsPage
