import { useState, type ReactNode } from 'react'
import {
  Box,
  useMediaQuery
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { SIDEBAR_WIDTH, type Page } from '@/shared/config'
import { Sidebar } from '@/widgets/sidebar'
import { AppHeader } from '@/widgets/app-header'

interface AppLayoutProps {
  page: Page
  onNavigate: (page: Page) => void
  children: ReactNode
}

export function AppLayout({ page, onNavigate, children }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))

  const handleNavigate = (next: Page) => {
    onNavigate(next)
    setMobileOpen(false)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar
        page={page}
        isDesktop={isDesktop}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onNavigate={handleNavigate}
      />
      <Box sx={{
        ml: { lg: `${SIDEBAR_WIDTH}px` }, minWidth: 0, minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
      }}>
        <AppHeader
          page={page}
          isDesktop={isDesktop}
          onOpenMenu={() => setMobileOpen(true)}
        />
        <Box component="main" sx={{ px: { xs: 2, sm: 3 }, pt: 4, pb: 5, flex: 1, minWidth: 0 }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
