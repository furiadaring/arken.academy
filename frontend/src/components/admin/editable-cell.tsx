'use client'

import { TTableColumn, TTableRow } from '@/types'
import { RefObject } from 'react'

type TEditableCellProps<T extends TTableRow> = {
  column: TTableColumn<T>
  row: T
  cellValue: unknown
  isFirstColumn: boolean
  isEditing: boolean
  editedValue: unknown
  firstInputRef: RefObject<HTMLInputElement | null>
  offices?: { name: string; id: string }[]
  onCellChange: (rowId: string, key: string, value: unknown) => void
}

export const renderEditableCell = <T extends TTableRow>({
  column,
  row,
  cellValue,
  isFirstColumn,
  isEditing,
  editedValue,
  firstInputRef,
  offices,
  onCellChange,
}: TEditableCellProps<T>) => {
  const value = editedValue !== undefined ? editedValue : cellValue

  if (!isEditing) {
    return column.render ? column.render(String(cellValue || ''), row) : String(cellValue || '')
  }

  if (column.key === 'username' && cellValue) {
    return String(cellValue || '')
  }

  if (column.key.toLowerCase().includes('status') || column.key.toLowerCase().includes('active')) {
    return (
      <select
        className="w-full rounded border border-[#444444] bg-[#333333] px-2 py-1 text-white"
        value={String(value)}
        onChange={(e) => onCellChange(row.id, column.key, e.target.value === 'true')}
      >
        <option value="true">Активен</option>
        <option value="false">Не активен</option>
      </select>
    )
  }

  if (column.key.toLowerCase().includes('office') && offices?.length) {
    return (
      <select
        className="w-full rounded border border-[#444444] bg-[#333333] px-2 py-1 text-white"
        value={String(value) || offices[0].name}
        onChange={(e) => onCellChange(row.id, column.key, e.target.value)}
      >
        {offices.map((office) => (
          <option key={office.name} value={office.name}>
            {office.name}
          </option>
        ))}
      </select>
    )
  }

  return (
    <input
      ref={isFirstColumn && column.key !== 'username' ? firstInputRef : null}
      type="text"
      className="w-full rounded border border-[#444444] bg-[#333333] px-2 py-1 text-white"
      value={String(value || '')}
      onChange={(e) => onCellChange(row.id, column.key, e.target.value)}
    />
  )
}
