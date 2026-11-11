import { useState } from 'react'
import { DirectoryPage } from '@/pages/directory'
import { Overview } from '@/pages/overview'
import { type Page } from '@/shared/config'
import { AppLayout } from '@/widgets/app-layout'

export function App() {
  const [page, setPage] = useState<Page>('directory')

  return (
    <AppLayout page={page} onNavigate={setPage}>
      {page === 'overview' && <Overview />}
      {page === 'directory' && <DirectoryPage />}
    </AppLayout>
  )
}
