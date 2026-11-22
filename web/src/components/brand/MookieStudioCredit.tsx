import { cn } from '@/lib/utils'

/**
 * The maker's credit (DESIGN.md: mookie studio credit): a small label above the official
 * mookie studio wordmark, linking to mookie studio on GitHub. The files in /brand/mookie-studio/
 * are used unchanged.
 */
export const MOOKIE_STUDIO_URL = 'https://github.com/mookie-studio'

export function MookieStudioCredit({
  label = 'A product by',
  onLight,
  className,
}: {
  label?: string
  onLight?: boolean
  className?: string
}) {
  return (
    <div className={cn('inline-flex flex-col items-start gap-1', className)}>
      <span className={cn('text-xs font-semibold tracking-[0.06em] uppercase', onLight ? 'text-ink-muted' : 'text-landing-ink-muted')}>
        {label}
      </span>
      <a
        href={MOOKIE_STUDIO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="mookie studio on GitHub"
        className={cn(
          '-mx-[6px] -mb-[6px] rounded-m outline-offset-2 focus-visible:outline-2',
          onLight ? 'focus-visible:outline-focus-ring' : 'focus-visible:outline-highlight-400',
        )}
      >
        <img
          src={onLight ? '/brand/mookie-studio/wordmark-on-light.svg' : '/brand/mookie-studio/wordmark-on-dark.svg'}
          alt="mookie studio"
          // The file has its own clear space (56 of 624 units on each side); the link's negative
          // margin lines the mark up with the label. 64px high gives a 52px mark and a readable name.
          className="block h-16 w-auto"
        />
      </a>
    </div>
  )
}
