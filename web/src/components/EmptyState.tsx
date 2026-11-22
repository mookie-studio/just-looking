import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** An empty shop window: ruled panes with nothing on display yet, one highlighter dot. */
function EmptyWindow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 88 40" className="mb-2 h-10 w-22 text-gray-300">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="1" width="86" height="38" rx="5" />
        <path d="M1 11h86M29.7 11v28M58.3 11v28" />
      </g>
      <circle cx="44" cy="25" r="4.5" className="fill-highlight-400" />
    </svg>
  )
}

/**
 * An empty list (DESIGN.md: Components, EmptyState): the drawn empty window, a short title, one
 * sentence on what will appear here, and optionally the action that adds the first item.
 */
export function EmptyState({
  title,
  children,
  action,
  className,
}: {
  title: string
  children?: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col items-center gap-2 rounded-l border border-dashed border-gray-300 bg-surface-raised/60 px-6 py-10 text-center', className)}>
      <EmptyWindow />
      <p className="font-semibold text-ink">{title}</p>
      {children && <p className="max-w-[46ch] text-sm text-ink-muted">{children}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  )
}
