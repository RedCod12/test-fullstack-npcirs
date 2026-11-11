import { useCallback, useMemo, useRef, useState } from 'react'
import type { IDatasource } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import {
    departmentApi,
    type Department,
    type DepartmentInput,
} from '@/entities/department'

import { useDepartmentActions } from '@/features/manage-department'
import { DepartmentSortField } from '@/entities/department/model/types'

interface UseDepartmentTableProps {
    selectedDepartment: Department | null
    onSelectDepartment: (department: Department | null) => void
}
export function useDepartmentTable({
    selectedDepartment,
    onSelectDepartment,
}: UseDepartmentTableProps) {
    const gridRef = useRef<AgGridReact<Department>>(null)

    const selectDepartment = (department: Department | null) => {
        onSelectDepartment(department)
        setError('')
    }

    const [editor, setEditor] = useState<Department | null | undefined>(undefined)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [error, setError] = useState('')
    const [gridError, setGridError] = useState('')
    const [total, setTotal] = useState<number | null>(null)

    const refresh = useCallback(() => {
        gridRef.current?.api.purgeInfiniteCache()
    }, [])

    const actions = useDepartmentActions({
        onChanged: refresh,
    })

    const datasource = useMemo<IDatasource>(
        () => ({
            getRows: async params => {
                try {
                    const sort = params.sortModel[0]

                    const page = await departmentApi.list({
                        limit: params.endRow - params.startRow,
                        offset: params.startRow,
                        sortBy: sort?.colId as DepartmentSortField | undefined,
                        sortOrder: sort?.sort,
                    })

                    setTotal(page.total)
                    setGridError('')

                    params.successCallback(page.items, page.total)
                } catch (error) {
                    setGridError(
                        error instanceof Error
                            ? error.message
                            : 'Не удалось загрузить отделы',
                    )

                    params.failCallback()
                }
            },
        }),
        [],
    )

    const openCreate = () => setEditor(null)

    const openEdit = () => {
        if (selectedDepartment) {
            setEditor(selectedDepartment)
        }
    }

    const closeEditor = () => setEditor(undefined)

    const save = async (payload: DepartmentInput) => {
        setError('')

        try {
            const result = await actions.save({
                id: editor?.id,
                payload,
            })

            if (selectedDepartment?.id === result.id) {
                onSelectDepartment(result)
            }

            closeEditor()
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Не удалось сохранить отдел',
            )
        }
    }

    const remove = async () => {
        if (!selectedDepartment) return

        setError('')

        try {
            await actions.remove(selectedDepartment.id)

            onSelectDepartment(null)
            gridRef.current?.api.deselectAll()
            setConfirmDelete(false)
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Не удалось удалить отдел',
            )
        }
    }

    return {
        gridRef,
        datasource,
        total,
        gridError,
        error,

        selectedDepartment,
        selectDepartment,

        editor,
        isEditorOpen: editor !== undefined,
        openCreate,
        openEdit,
        closeEditor,

        confirmDelete,
        requestDelete: () => setConfirmDelete(true),
        cancelDelete: () => setConfirmDelete(false),

        save,
        remove,
        refresh,

        isSaving: actions.isSaving,
        isDeleting: actions.isDeleting,
        clearError: () => setError(''),
    }
}