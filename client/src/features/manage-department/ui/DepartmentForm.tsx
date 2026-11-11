
import {
  Alert,
  Box,
  Stack,
  TextField
} from '@mui/material'

import type { Department, DepartmentInput } from '@/entities/department'
import type { FormFieldConfig } from '@/shared/ui/types'

import { departmentFields } from '../model/departmentFields'
import { useDepartmentForm } from '../model/useDepartmentForm'
import { FormActions } from '@/shared/ui'

interface DepartmentFormProps {
  initial?: Department
  isPending: boolean
  onSave: (data: DepartmentInput) => Promise<void>
  onCancel: () => void
}

export function DepartmentForm({
  initial,
  isPending,
  onSave,
  onCancel,
}: DepartmentFormProps) {
  const {
    register,
    errors,
    isSubmitting,
    submit,
  } = useDepartmentForm({ initial, onSave })

  const disabled = isPending || isSubmitting

  const renderField = ({
    name,
    label,
    type,
    required,
    placeholder,
    min,
    max,
    step,
  }: FormFieldConfig<DepartmentInput>) => {
    const { ref, ...registration } = register(name, {
      valueAsNumber:
        name === 'budget' || name === 'plannedPositions',
    })

    return (
      <TextField
        key={name}
        {...registration}
        inputRef={ref}
        label={label}
        type={type}
        required={required}
        placeholder={placeholder}
        fullWidth
        error={!!errors[name]}
        helperText={errors[name]?.message}
        slotProps={{
          htmlInput: { min, max, step },
          ...(type === 'date' && {
            inputLabel: { shrink: true },
          }),
        }}
      />
    )
  }

  return (
    <Box component="form" onSubmit={submit} noValidate sx={{ pt: 1 }}>
      <Stack spacing={2.5}>
        {departmentFields.slice(0, 2).map(renderField)}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          {departmentFields.slice(2).map(renderField)}
        </Stack>

        {errors.root?.server && (
          <Alert severity="error">
            {errors.root.server.message}
          </Alert>
        )}

        <FormActions
          isPending={disabled}
          onCancel={onCancel}
        />
      </Stack>
    </Box>
  )
}
