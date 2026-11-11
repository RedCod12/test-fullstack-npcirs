
import { TextField, type TextFieldProps } from '@mui/material'
import {
  useController,
  useFormContext,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'

type FormTextFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'name' | 'value' | 'onChange' | 'error' | 'helperText'
> & {
  name: FieldPath<T>
}

export function FormTextField<T extends FieldValues>({
  name,
  type,
  ...props
}: FormTextFieldProps<T>) {
  const { control } = useFormContext<T>()
  const {
    field,
    fieldState: { error },
  } = useController({ name, control })

  return (
    <TextField
      {...props}
      {...field}
      type={type}
      fullWidth
      value={field.value ?? ''}
      onChange={event => {
        const value = event.target.value

        field.onChange(
          type === 'number'
            ? value === '' ? undefined : Number(value)
            : value,
        )
      }}
      inputRef={field.ref}
      error={!!error}
      helperText={error?.message}
    />
  )
}
