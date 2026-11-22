import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type Status = 'Draft' | 'Published' | 'Archived' | 'Open' | 'Handled' | 'Featured'

// DESIGN.md: StatusBadge. A sticker: the 500-shade dot carries the state on its tint with dark text,
// always with the word; neutral states take a hollow dot.
const styles: Record<Status, { badge: string; dot: string; hollow?: boolean }> = {
  Published: { badge: 'bg-success-50 text-success-700', dot: 'bg-success-500' },
  Draft: { badge: 'bg-warning-50 text-warning-700', dot: 'bg-warning-500' },
  Archived: { badge: 'bg-gray-100 text-gray-700', dot: '', hollow: true },
  Handled: { badge: 'bg-gray-100 text-gray-700', dot: '', hollow: true },
  Open: { badge: 'bg-brand-50 text-brand-800', dot: 'bg-brand-500' },
  Featured: { badge: 'bg-highlight-400 text-brand-950', dot: 'bg-brand-950' },
}

/** The status of a Product or an Inquiry, or the Featured mark, as a small labelled badge. */
export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const style = styles[status]
  return (
    <Badge className={cn('gap-1.5 rounded-full border-0 py-0.5 pr-2.5 pl-2 text-xs leading-4 font-semibold whitespace-nowrap', style.badge, className)}>
      <span
        aria-hidden="true"
        data-dot={style.hollow ? 'hollow' : 'solid'}
        className={cn('size-1.5 shrink-0 rounded-full', style.hollow ? 'border border-current' : style.dot)}
      />
      {status}
    </Badge>
  )
}
