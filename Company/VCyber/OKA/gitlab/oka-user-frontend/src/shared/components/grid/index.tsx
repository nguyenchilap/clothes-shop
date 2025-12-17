import type { ReactNode } from 'react'
import { cn } from '@/shared/utils'

export interface GridProps {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4 | 5 | 6
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

const columnClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
}

const gapClasses = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6'
}

export function Grid({ children, columns = 4, gap = 'md', className }: GridProps) {
  return (
    <div className={cn('grid', columnClasses[columns], gapClasses[gap], className)}>
      {children}
    </div>
  )
}

export interface GridItemProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function GridItem({ children, className, onClick }: GridItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-card rounded-lg border border-border p-4 hover:border-primary/50 transition-colors',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Grid

