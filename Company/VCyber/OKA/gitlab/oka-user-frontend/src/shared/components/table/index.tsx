import type { ReactNode } from 'react'
import { cn } from '@/shared/utils'
import { t } from '@/services/translate'

export interface Column<T> {
  key: keyof T | string
  header: string
  width?: string
  render?: (row: T, index: number) => ReactNode
}

export interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  className?: string
  onRowClick?: (row: T, index: number) => void
  emptyMessage?: string
  isLoading?: boolean
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  className,
  onRowClick,
  emptyMessage,
  isLoading = false
}: TableProps<T>) {
  const emptyText = emptyMessage || t('common.noData')
  
  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
      </div>
    )
  }

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className='w-full'>
        <thead>
          <tr className='bg-table-header border-b border-border'>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className='px-4 py-3 text-left text-sm font-medium text-foreground'
                style={{ width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className='px-4 py-12 text-center text-muted-foreground'
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(row, index)}
                className={cn(
                  'border-b border-border hover:bg-secondary/50 transition-colors',
                  onRowClick && 'cursor-pointer'
                )}
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className='px-4 py-3 text-sm text-foreground'>
                    {col.render
                      ? col.render(row, index)
                      : String(row[col.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
