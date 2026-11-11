import type { TextFieldProps } from '@mui/material'
import type { FieldPath, FieldValues } from 'react-hook-form'

export type FormFieldConfig<T extends FieldValues> = {
  name: FieldPath<T>
  label: string
  type?: TextFieldProps['type']
  required?: boolean
  placeholder?: string
  min?: number
  max?: number
  step?: number
}