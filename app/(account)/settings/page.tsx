import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/session'
import PageHeader from '@/components/custom/page-header'
import SettingsForm from '@/components/custom/settings-form'

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    return redirect('/')
  }

  // We cannot pass ObjectId as a prop, that's why we need to extract the _id fields from the links.
  const linksWithoutIds = user.links?.map((l) => ({
    title: l.title,
    url: l.url,
  }))

  return (
    <>
      <PageHeader title="Settings" />
      <SettingsForm
        user={{
          name: user.name!,
          username: user.username!,
          bio: user.bio!,
          links: linksWithoutIds!,
        }}
      />
    </>
  )
}
