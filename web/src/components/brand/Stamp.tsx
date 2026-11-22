import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** The price stamp (DESIGN.md: Stamp), in the condensed voice. Ink brand-700 on the highlighter and pale tags; `onInk` for highlighter ink on the ink ground. */
export function Stamp({ children, onInk, className }: { children: ReactNode; onInk?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        'inline-block -rotate-6 rounded-s border-[2.5px] border-current px-2 py-0.5 font-display text-[15px] leading-[1.1] tracking-[0.04em] uppercase',
        onInk ? 'text-highlight-400' : 'text-brand-700',
        className,
      )}
    >
      {children}
    </span>
  )
}
