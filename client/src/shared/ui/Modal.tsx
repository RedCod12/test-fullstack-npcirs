import type { ReactNode } from 'react'
import { Dialog, DialogContent, DialogTitle, IconButton, Stack } from '@mui/material'
import { X } from 'lucide-react'

type ModalProps = { title: string; children: ReactNode; onClose: () => void }

export function Modal({ title, children, onClose }: ModalProps) {
  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm" aria-labelledby="editor-dialog-title">
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 3, pt: 2 }}>
        <DialogTitle id="editor-dialog-title" sx={{ p: 0, fontWeight: 700 }}>{title}</DialogTitle>
        <IconButton onClick={onClose} aria-label="Закрыть"><X size={20} /></IconButton>
      </Stack>
      <DialogContent sx={{ p: 3 }}>{children}</DialogContent>
    </Dialog>
  )
}
