
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material'

import type { Department } from '@/entities/department'
import type { Employee } from '@/entities/employee'
import { EmployeeForm } from '@/features/manage-employee'
import { Table, Modal, ConfirmDialog } from '@/shared/ui'

import { employeeColumns } from '../model/columns'
import { useEmployeeTable } from '../model/useEmployeeTable'

interface EmployeeGridProps {
  department: Department | null
  onDepartmentChange: (department: Department | null) => void
}

export function EmployeeGrid({
  department,
  onDepartmentChange,
}: EmployeeGridProps) {
  const employee = useEmployeeTable({
    department,
    onDepartmentChange,
  })

  const employeesQuery = employee.employeesQuery

  return (
    <>
      <Table<Employee>
        key={department?.id ?? 'no-department'}
        title="Сотрудники"
        description={
          department
            ? `${department.name} · ${employeesQuery.data?.length ?? 0} сотрудников`
            : 'Выберите отдел в таблице выше'
        }
        height={360}
        defaultColDef={{
          sortable: true,
          resizable: true,
        }}
        columnDefs={employeeColumns}
        rowData={employeesQuery.data ?? []}
        loading={employeesQuery.isPending && !!department}
        selectedItem={employee.selectedEmployee}
        onCreate={employee.openCreate}
        onEdit={employee.openEdit}
        onDelete={employee.requestDelete}
        createDisabled={!department}
        onRowClicked={event =>
          employee.selectEmployee(event.data ?? null)
        }
        getRowId={params => String(params.data.id)}
        overlayNoRowsTemplate="В этом отделе пока нет сотрудников"
        error={employee.error}
        emptyState={
          !department ? (
            <Box sx={{ py: 7, textAlign: 'center' }}>
              <Typography variant="body1">
                Пока отдел не выбран
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Выберите строку в таблице отделов.
              </Typography>
            </Box>
          ) : employeesQuery.isError ? (
            <Alert
              severity="error"
              action={
                <Button onClick={() => employeesQuery.refetch()}>
                  Повторить
                </Button>
              }
            >
              Не удалось загрузить сотрудников
            </Alert>
          ) : undefined
        }
      />

      {employee.isEditorOpen && department && (
        <Modal
          title={
            employee.editor
              ? 'Изменить сотрудника'
              : 'Добавить сотрудника'
          }
          onClose={employee.closeEditor}
        >
          {employee.departmentsQuery.isPending ? (
            <CircularProgress size={24} />
          ) : employee.departmentsQuery.isError ? (
            <Alert
              severity="error"
              action={
                <Button onClick={() => employee.departmentsQuery.refetch()}>
                  Повторить
                </Button>
              }
            >
              Не удалось загрузить отделы
            </Alert>
          ) : (
            <EmployeeForm
              initial={employee.editor ?? undefined}
              departmentId={department.id}
              departments={employee.departmentsQuery.data ?? []}
              isPending={employee.isSaving}
              onSave={employee.save}
              onCancel={employee.closeEditor}
            />
          )}
        </Modal>
      )}

      {employee.confirmDelete && employee.selectedEmployee && (
        <ConfirmDialog
          title="Удалить сотрудника?"
          description={`Сотрудник «${employee.selectedEmployee.fullName}» будет удалён из базы данных.`}
          loading={employee.isDeleting}
          onCancel={employee.cancelDelete}
          onConfirm={employee.remove}
        />
      )}
    </>
  )
}
