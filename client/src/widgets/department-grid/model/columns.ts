import type { ColDef } from 'ag-grid-community'
import type { Department } from '@/entities/department'
import { formatMoney, formatDate } from '@/shared/lib/formatters'

export const departmentColumns: ColDef<Department>[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 80,
        maxWidth: 90,
        sortable: true,
    },
    {
        field: 'name',
        headerName: 'Отдел',
        flex: 2,
        minWidth: 240,
        cellStyle: { fontWeight: '600' },
        sortable: true,
    },
    {
        field: 'budget',
        headerName: 'Бюджет',
        valueFormatter: p => formatMoney(p.value),
        flex: 1,
        minWidth: 155,
        sortable: true,
    },
    {
        field: 'openedOn',
        headerName: 'Дата открытия',
        valueFormatter: p => formatDate(p.value),
        flex: 1,
        minWidth: 155,
        sortable: true,
    },
    {
        field: 'plannedPositions',
        headerName: 'Штатных мест',
        flex: 1,
        minWidth: 140,
        sortable: true,
    },
]