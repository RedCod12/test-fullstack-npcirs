import type { ReactNode } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { Modal } from './Modal'

interface ConfirmDialogProps {
  title: string
  description: ReactNode
  loading?: boolean
  onConfirm: () => void | Promise<void>
  onCancel: () => void
}

export function ConfirmDialog({
  title,
  description,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal title={title} onClose={onCancel}>
      <Typography variant="body2" sx={{ mb: 3 }}>
        {description}
      </Typography>

      <Stack direction="row" justifyContent="flex-end" spacing={1}>
        <Button
          color="inherit"
          disabled={loading}
          onClick={onCancel}
        >
          Отмена
        </Button>

        <Button
          variant="contained"
          color="error"
          loading={loading}
          onClick={onConfirm}
        >
          Удалить
        </Button>
      </Stack>
    </Modal>
  )
}