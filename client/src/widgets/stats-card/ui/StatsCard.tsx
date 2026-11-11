import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import type { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  label: string
  value: string
  icon: LucideIcon
  gradient: string
  loading?: boolean
}

export function StatsCard({
  label,
  value,
  icon: Icon,
  gradient,
  loading,
}: StatsCardProps) {
  return (
    <Card sx={{ overflow: 'visible', mt: 1 }}>
      <CardContent
        sx={{
          position: 'relative',
          minHeight: 134,
          p: '20px !important',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -22,
            left: 20,
            width: 63,
            height: 63,
            borderRadius: 2.5,
            display: 'grid',
            placeItems: 'center',
            color: '#fff',
            background: gradient,
            boxShadow: '0 8px 18px rgba(52,71,103,.2)',
          }}
        >
          <Icon size={26} />
        </Box>

        <Stack
          sx={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '1.45rem',
              textAlign: 'end',
            }}
          >
            {loading ? '…' : value}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}