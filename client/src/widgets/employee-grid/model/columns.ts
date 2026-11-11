import type { ColDef } from 'ag-grid-community'
import type { Employee } from '@/entities/employee'
import { formatMoney, formatDate } from '@/shared/lib/formatters'

export const employeeColumns: ColDef<Employee>[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 82,
        maxWidth: 100
    },
    {
        field: 'fullName',
        headerName: 'Сотрудник',
        flex: 1.7,
        minWidth: 180,
        cellStyle: { fontWeight: '600' }
    },
    {
        field: 'position',
        headerName: 'Должность',
        flex: 1.2,
        minWidth: 135
    },
    {
        field: 'salary',
        headerName: 'Оклад',
        valueFormatter: p => formatMoney(p.value),
        flex: 1,
        minWidth: 130
    },
    {
        field: 'grade',
        headerName: 'Грейд',
        width: 98
    },
    {
        field: 'hiredAt',
        headerName: 'Дата приёма',
        valueFormatter: p => formatDate(p.value),
        flex: 1,
        minWidth: 140
    },
]