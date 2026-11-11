import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import {
  NAV_ITEMS,
  SIDEBAR_WIDTH,
  type Page
} from '@/shared/config'

interface SidebarProps {
  page: Page
  isDesktop: boolean
  mobileOpen: boolean
  onClose: () => void
  onNavigate: (page: Page) => void
}

export function Sidebar({ page, isDesktop, mobileOpen, onClose, onNavigate }: SidebarProps) {
  return (
    <Drawer
      variant={isDesktop ? 'permanent' : 'temporary'}
      open={isDesktop || mobileOpen}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: { lg: SIDEBAR_WIDTH },
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          border: 0,
          boxSizing: 'border-box',
          p: 1.5,
          bgcolor: 'transparent',
          backgroundImage: 'none',
        },
      }}
    >
      <Box sx={{
        height: 'calc(100vh - 24px)',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 6px 15px #00000027',
      }}>
        <Box sx={{
          height: '100%', p: 2, display: 'flex', flexDirection: 'column',
          color: '#fff', background: 'linear-gradient(195deg,#42424a 0%,#191919 100%)',
        }}>

          <List sx={{ px: 0 }} aria-label="Главное меню">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <ListItemButton
                key={id}
                selected={page === id}
                onClick={() => onNavigate(id)}
                sx={{
                  mb: 0.5, borderRadius: 2.5, minHeight: 49, color: '#fff',
                  '&.Mui-selected': {
                    background: 'linear-gradient(195deg,#49a3f1,#1a73e8)',
                    boxShadow: '0 4px 12px #1a73e855',
                  },
                  '&.Mui-selected:hover': { bgcolor: '#1a73e8' },
                  '&:hover': { bgcolor: '#ffffff17' },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 39 }}><Icon size={20} /></ListItemIcon>
                <ListItemText primary={label} primaryTypographyProps={{ fontSize: 13, fontWeight: 600 }} />
              </ListItemButton>
            ))}
          </List>

          <Box sx={{ flexGrow: 1 }} />
          <Divider sx={{ borderColor: '#ffffff30', mb: 2 }} />
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ px: 1, pb: 1 }}>
            <Avatar sx={{ width: 35, height: 35, bgcolor: '#1a73e8', fontSize: 12 }}>AD</Avatar>
            <Box>
              <Typography fontSize={12} fontWeight={700} color="inherit">Администратор</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  )
}
