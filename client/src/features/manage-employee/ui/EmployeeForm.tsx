
import {
  Alert,
  Box,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material'
import { Controller } from 'react-hook-form'

import type { Department } from '@/entities/department'
import type { Employee, EmployeeInput } from '@/entities/employee'
import type { FormFieldConfig } from '@/shared/ui/types'

import { employeeFields } from '../model/employeeFields'
import { useEmployeeForm } from '../model/useEmployeeForm'
import { FormActions } from '@/shared/ui'

interface EmployeeFormProps {
  departmentId: number
  departments: Department[]
  initial?: Employee
  isPending: boolean
  onSave: (data: EmployeeInput) => Promise<void>
  onCancel: () => void
}

export function EmployeeForm({
  departmentId,
  departments,
  initial,
  isPending,
  onSave,
  onCancel,
}: EmployeeFormProps) {
  const {
    field,
    control,
    errors,
    isSubmitting,
    submit,
  } = useEmployeeForm({
    departmentId,
    initial,
    onSave,
  })

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
  }: FormFieldConfig<EmployeeInput>) => (
    <TextField
      key={name}
      {...field(name)}
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

  return (
    <Box component="form" onSubmit={submit} noValidate sx={{ pt: 1 }}>
      <Stack spacing={2.5}>
        {employeeFields.slice(0, 2).map(renderField)}

        <Controller
          name="departmentId"
          control={control}
          render={({ field: departmentField }) => (
            <TextField
              select
              label="Отдел"
              required
              fullWidth
              value={departmentField.value}
              onChange={event =>
                departmentField.onChange(Number(event.target.value))
              }
              onBlur={departmentField.onBlur}
              inputRef={departmentField.ref}
              error={!!errors.departmentId}
              helperText={errors.departmentId?.message}
            >
              {departments.map(department => (
                <MenuItem key={department.id} value={department.id}>
                  {department.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          {employeeFields.slice(2, 4).map(renderField)}
        </Stack>

        {employeeFields.slice(4).map(renderField)}

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
