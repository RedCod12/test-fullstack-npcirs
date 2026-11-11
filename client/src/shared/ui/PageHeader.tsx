import { Box, Typography } from '@mui/material'

interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography color="text.secondary" variant="body2">
          {description}
        </Typography>
      )}
    </Box>
  )
}