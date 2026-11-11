
import type { ReactNode, Ref } from 'react'
import {
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { AgGridReact, type AgGridReactProps } from 'ag-grid-react'

import { tableTheme } from './theme'

interface TableProps<T> extends AgGridReactProps<T> {
  title: string
  description?: string
  height?: number
  gridRef?: Ref<AgGridReact<T>>

  selectedItem?: T | null
  onCreate: () => void
  onEdit: () => void
  onDelete: () => void
  onRefresh?: () => void

  createDisabled?: boolean
  error?: string
  emptyState?: ReactNode
  children?: ReactNode
}

export function Table<T,>({
  title,
  description,
  height = 360,
  gridRef,

  selectedItem,
  onCreate,
  onEdit,
  onDelete,
  onRefresh,

  createDisabled = false,
  emptyState,
  children,

  rowHeight = 47,
  headerHeight = 45,

  ...gridProps
}: TableProps<T>) {
  return (
    <Card sx={{ p: { xs: 2, md: 3 }, minWidth: 0 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ md: 'center' }}
        justifyContent="space-between"
        gap={2}
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography variant="h6">{title}</Typography>

          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>

        <Stack direction="row" gap={1} flexWrap="wrap">
          <Button
            variant="outlined"
            size="small"
            startIcon={<Pencil size={15} />}
            disabled={!selectedItem}
            onClick={onEdit}
          >
            Изменить
          </Button>

          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<Trash2 size={15} />}
            disabled={!selectedItem}
            onClick={onDelete}
          >
            Удалить
          </Button>

          <Button
            variant="contained"
            size="small"
            startIcon={<Plus size={15} />}
            disabled={createDisabled}
            onClick={onCreate}
          >
            Добавить
          </Button>

          {onRefresh && (
            <IconButton
              aria-label="Обновить таблицу"
              onClick={onRefresh}
            >
              <RefreshCw size={18} />
            </IconButton>
          )}
        </Stack>
      </Stack>

      {emptyState ?? (
        <Box
          sx={{
            height,
            width: '100%',
            minWidth: 0,

            '& .ag-row': {
              cursor: 'pointer',
            },

            '& .ag-row-selected': {
              backgroundColor: '#dbeafe !important',
              borderLeft: '3px solid #1a73e8',
            },
          }}
        >
          <AgGridReact<T>
            ref={gridRef}
            theme={tableTheme}
            rowHeight={rowHeight}
            headerHeight={headerHeight}
            rowSelection={{
              mode: 'singleRow',
              checkboxes: false,
              enableClickSelection: true,
            }}
            {...gridProps}
          />
        </Box>
      )}

      {children}
    </Card>
  )
}
