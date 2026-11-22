import { cn } from '@/lib/utils'

/**
 * The maker's credit (DESIGN.md: mookie studio credit), as in EntryHub's footer: "A product by"
 * above the official mookie studio wordmark at a large size, linking to mookie studio on GitHub.
 * The files in /brand/mookie-studio/ are used unchanged.
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
      <span className={cn('text-base', onLight ? 'text-ink-muted' : 'text-landing-ink-muted')}>
        {label}
      </span>
      <a
        href={MOOKIE_STUDIO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="mookie studio on GitHub"
        className={cn(
          '-ml-2 rounded-m outline-offset-4 focus-visible:outline-2',
          onLight ? 'focus-visible:outline-focus-ring' : 'focus-visible:outline-highlight-400',
        )}
      >
        <img
          src={onLight ? '/brand/mookie-studio/wordmark-on-light.svg' : '/brand/mookie-studio/wordmark-on-dark.svg'}
          alt="mookie studio"
          // The file has its own clear space (56 of 624 units on each side); the negative margin lines
          // the mark up with the label. Shown large, as in EntryHub's footer.
          width={1684}
          height={624}
          className="block h-24 w-auto sm:h-26"
        />
      </a>
    </div>
  )
}
