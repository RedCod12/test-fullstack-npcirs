import { Button, Stack } from '@mui/material'

interface FormActionsProps {
  isPending: boolean
  onCancel: () => void
}

export function FormActions({
  isPending,
  onCancel,
}: FormActionsProps) {
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      spacing={1.5}
      sx={{ pt: 1 }}
    >
      <Button
        variant="outlined"
        color="inherit"
        disabled={isPending}
        onClick={onCancel}
      >
        Отмена
      </Button>

      <Button
        type="submit"
        variant="contained"
        loading={isPending}
      >
        Сохранить
      </Button>
    </Stack>
  )
}