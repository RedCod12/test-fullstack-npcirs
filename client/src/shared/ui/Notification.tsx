import { Alert, Snackbar } from '@mui/material'

interface NotificationProps {
  message: string
  onClose: () => void
}

export function Notification({ message, onClose }: NotificationProps) {
  return (
    <Snackbar
      open={!!message}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={onClose}
    >
      <Alert
        severity="error"
        variant="filled"
        onClose={onClose}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}