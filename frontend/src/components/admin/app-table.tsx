'use client'

import { TAppTableProps, TTableRow } from '@/types'
import { useEffect, useRef, useState } from 'react'
import { ActionButton } from './btn'
import { renderEditableCell } from './editable-cell'

export const AppTable = <T extends TTableRow>({
  columns = [],
  data = [],
  onEdit,
  onDelete,
  onAdd,
  offices,
  className = '',
  headerClassName = '',
  rowClassName = '',
  cellClassName = '',
  actionLabel = 'Изменить',
  emptyMessage = 'Нет данных для отображения',
  editingRows = [],
}: TAppTableProps<T>) => {
  const isRowEditing = (id: string) => editingRows.includes(id)
  const [editedData, setEditedData] = useState<Record<string, Record<string, unknown>>>({})
  const handleEditClick = (id: string, row: T) => {
    if (onEdit) {
      if (isRowEditing(id) && editedData[id]) {
        const updatedRow = { ...row, ...editedData[id] }
        onEdit(id, updatedRow as T)
      } else {
        onEdit(id, row)
      }
    }

    if (!isRowEditing(id)) {
      setEditedData((prev) => ({ ...prev, [id]: {} }))
    }
  }

  const handleAddClick = () => {
    if (onAdd) {
      const tempId = `new-${Date.now()}`

      const emptyRow = {
        id: tempId,
        ...columns.reduce(
          (acc, column) => ({
            ...acc,
            [column.key]: '',
          }),
          {},
        ),
      } as unknown as T

      setEditedData((prev) => ({
        ...prev,
        [tempId]: {},
      }))

      onAdd(tempId, emptyRow)
    }
  }

  const handleCellChange = (rowId: string, key: string, value: unknown) => {
    setEditedData((prev) => ({
      ...prev,
      [rowId]: { ...prev[rowId], [key]: value },
    }))
  }

  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editingRows.length > 0) {
      setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus()
        }
      }, 0)
    }
  }, [editingRows])

  return (
    <div className={`w-full ${className}`}>
      {onAdd && (
        <div className="p-4">
          <ActionButton disabled={false} onClick={handleAddClick} variant="success">
            Добавить +
          </ActionButton>
        </div>
      )}
      <div className="w-full overflow-x-auto rounded-xl bg-[#222222]">
        <table className="w-full min-w-full">
          <thead>
            <tr className={`bg-[#2F2F2F] ${headerClassName}`}>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-xs font-light text-white ${column.className || ''}`}
                  style={column.width ? { maxWidth: `${column.width}px` } : {}}
                >
                  {column.header}
                </th>
              ))}
              {(onEdit || onDelete) && <th className="w-32 px-4 py-3"></th>}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="py-8 text-center text-sm text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id} className={`border-b border-[#2F2F2F] ${rowClassName}`}>
                  {columns.map((column, colIndex) => {
                    const cellValue = row[column.key as keyof TTableRow]
                    return (
                      <td
                        key={column.key}
                        className={`truncate overflow-hidden px-4 py-4 text-xs font-light text-white ${cellClassName} ${column.className || ''}`}
                        style={column.width ? { maxWidth: `${column.width}px` } : {}}
                      >
                        {isRowEditing(row.id)
                          ? renderEditableCell({
                              column,
                              row,
                              cellValue,
                              isFirstColumn: colIndex === 0,
                              isEditing: true,
                              editedValue: editedData[row.id]?.[column.key],
                              firstInputRef,
                              offices,
                              onCellChange: handleCellChange,
                            })
                          : column?.render
                            ? (() => {
                                const rendered = column.render(cellValue, row)
                                if (
                                  typeof rendered === 'string' &&
                                  rendered.trim().startsWith('<') &&
                                  rendered.trim().endsWith('>')
                                )
                                  return <div dangerouslySetInnerHTML={{ __html: rendered }} />
                                return rendered
                              })()
                            : typeof cellValue === 'object' && cellValue !== null
                              ? JSON.stringify(cellValue)
                              : String(cellValue || '')}
                      </td>
                    )
                  })}
                  {(onEdit || onDelete) && (
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        {onEdit && (
                          <ActionButton
                            onClick={() => handleEditClick(row.id, row)}
                            variant={isRowEditing(row.id) ? 'success' : 'primary'}
                          >
                            {isRowEditing(row.id) ? 'Сохранить' : actionLabel}
                          </ActionButton>
                        )}
                        {onDelete && (
                          <ActionButton
                            variant="danger"
                            disabled={isRowEditing(row.id)}
                            onClick={() => onDelete(row.id)}
                          >
                            Удалить
                          </ActionButton>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
