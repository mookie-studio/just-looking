import { cn } from '@/lib/utils'

type LogoVariant = 'default' | 'reversed'
type LogoKind = 'wordmark' | 'mark'

const files: Record<LogoKind, Record<LogoVariant, string>> = {
  wordmark: {
    default: '/brand/just-looking-wordmark.svg',
    reversed: '/brand/just-looking-wordmark-reversed.svg',
  },
  mark: {
    default: '/brand/just-looking-mark-ink.svg',
    reversed: '/brand/just-looking-mark.svg',
  },
}

/**
 * The Just Looking logo (DESIGN.md: Logo): the shop-window mark and the name, always an image of the
 * outlined files in /brand/, never retyped. `default` for light grounds (ink tile, ink name),
 * `reversed` for the ink and dark grounds (white tile, white name). Set the height with className
 * (at least h-5 for the wordmark, h-4 for the mark).
 */
export function Logo({
  variant = 'default',
  kind = 'wordmark',
  className,
}: {
  variant?: LogoVariant
  kind?: LogoKind
  className?: string
}) {
  return <img src={files[kind][variant]} alt="Just Looking" className={cn('inline-block w-auto', kind === 'wordmark' ? 'h-7' : 'h-6', className)} />
}
