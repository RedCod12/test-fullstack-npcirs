import {
  Box,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material'
import { Menu } from 'lucide-react'
import { NAV_ITEMS, type Page } from '@/shared/config'

interface AppHeaderProps {
  page: Page
  isDesktop: boolean
  onOpenMenu: () => void
}

export function AppHeader({ page, isDesktop, onOpenMenu }: AppHeaderProps) {
  const title = NAV_ITEMS.find(item => item.id === page)?.label

  return (
    <Toolbar sx={{
      minHeight: '78px !important', mx: { xs: 1, sm: 3 }, mt: 1.5,
      borderRadius: 3, bgcolor: '#ffffffb8', backdropFilter: 'blur(12px)',
      boxShadow: '0 3px 15px #0000000a',
    }}>
      {!isDesktop && (
        <IconButton onClick={onOpenMenu} aria-label="Открыть меню" sx={{ mr: 1 }}>
          <Menu size={21} />
        </IconButton>
      )}
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" color="text.secondary">Рабочее пространство /</Typography>
        <Typography fontWeight={700} fontSize={14}>{title}</Typography>
      </Box>
    </Toolbar>
  )
}
