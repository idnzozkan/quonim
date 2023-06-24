'use client'

import React, { useState } from 'react'

import styles from './styles.module.scss'
import PageHeader from '@/components/custom/page-header'
import Input from '@/components/core/input'
import Button from '@/components/core/button'
import Textarea from '@/components/core/textarea'
import Label from '@/components/core/label'
import { Icons } from '@/components/support/icons'
import DynamicSocialLinks from '@/components/custom/dynamic-social-links'

interface Link {
  title: string
  url: string
}

const SettingsPage = () => {
  const [links, setLinks] = useState<Link[]>([{ title: '', url: '' }])

  return (
    <>
      <PageHeader title="Settings" />
      <form className={styles.formContainer}>
        <div className={styles.personalInformation}>
          <div>
            <Label htmlFor="name">Display Name</Label>
            <Input id="name" className={styles.input} />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" className={styles.input} />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" className={styles.textarea} />
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
        <Button className={styles.saveBtn} variant="primary">
          <Icons.Save size={18} />
          Save
        </Button>
      </form>
    </>
  )
}

export default SettingsPage
