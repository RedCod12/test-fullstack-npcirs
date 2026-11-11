
import {
  Table,
  Modal,
  Notification,
  ConfirmDialog
} from '@/shared/ui'
import { DepartmentForm } from '@/features/manage-department'
import type { Department } from '@/entities/department'

import { useDepartmentTable } from '../model/useDepartmentTable'
import { departmentColumns } from '../model/columns'

interface DepartmentGridProps {
  selectedDepartment: Department | null
  onSelectDepartment: (department: Department | null) => void
}

export function DepartmentGrid({
  selectedDepartment,
  onSelectDepartment,
}: DepartmentGridProps) {
  const department = useDepartmentTable({
    selectedDepartment,
    onSelectDepartment,
  })

  return (
    <Table<Department>
      title="Отделы компании"
      description={
        department.total === null && 'Загрузка…' || `${department.total} подразделений · подгрузка при прокрутке`
      }
      height={420}
      gridRef={department.gridRef}
      columnDefs={departmentColumns}
      rowModelType="infinite"
      datasource={department.datasource}
      cacheBlockSize={30}
      maxBlocksInCache={4}
      maxConcurrentDatasourceRequests={1}
      selectedItem={selectedDepartment}
      onCreate={department.openCreate}
      onEdit={department.openEdit}
      onDelete={department.requestDelete}
      onRefresh={department.refresh}
      onRowClicked={event =>
        onSelectDepartment(event.data ?? null)
      }
      getRowId={params => String(params.data.id)}
      error={department.error || department.gridError}
    >
      <Notification
        message={department.error}
        onClose={department.clearError}
      />

      {department.isEditorOpen && (
        <Modal
          title={department.editor ? 'Изменить отдел' : 'Добавить отдел'}
          onClose={department.closeEditor}
        >
          <DepartmentForm
            initial={department.editor ?? undefined}
            isPending={department.isSaving}
            onSave={department.save}
            onCancel={department.closeEditor}
          />
        </Modal>
      )}

      {department.confirmDelete && selectedDepartment && (
        <ConfirmDialog
          title="Удалить отдел?"
          description={`Отдел «${selectedDepartment.name}» можно удалить только если в нём нет сотрудников.`}
          loading={department.isDeleting}
          onCancel={department.cancelDelete}
          onConfirm={department.remove}
        />
      )}
    </Table>
  )
}
