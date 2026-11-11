import { useState } from 'react'
import { Stack } from '@mui/material'

import type { Department } from '@/entities/department'
import { PageHeader } from '@/shared/ui'

import { DepartmentGrid } from '@/widgets/department-grid'
import { EmployeeGrid } from '@/widgets/employee-grid'

export function DirectoryPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Структура компании"
        description="Выберите отдел, чтобы посмотреть его сотрудников."
      />

      <DepartmentGrid
        selectedDepartment={selectedDepartment}
        onSelectDepartment={setSelectedDepartment}
      />

      <EmployeeGrid
        department={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
      />
    </Stack>
  )
}