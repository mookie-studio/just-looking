import { Link } from 'react-router'
import { cn } from '@/lib/utils'
import { Stamp } from './Stamp'

export type HangTagAttribute = { name: string; value: string }

type HangTagProps = {
  tone?: 'highlight' | 'pale'
  /** The tenant line on top, for example "forja · hardware". */
  tenantLine: string
  name: string
  /** Up to three attributes; extra ones are not shown. */
  attributes?: HangTagAttribute[]
  /** When set, the whole tag is one link. */
  href?: string
  /** Visible link label at the bottom of the card. */
  linkLabel?: string
  /** Accessible name of the link; defaults to "Open the {tenantLine} demo". */
  linkName?: string
  /** Length of the string in px, 24 to 120. */
  drop?: number
  sway?: boolean
  priceLabel?: string
  stampText?: string
  className?: string
}

/** A swing tag hanging from its string (DESIGN.md: HangTag). Landing and sign-in only, never product lists. */
export function HangTag({
  tone = 'highlight',
  tenantLine,
  name,
  attributes = [],
  href,
  linkLabel,
  linkName,
  drop = 40,
  sway,
  priceLabel = 'Price',
  stampText = 'Just looking',
  className,
}: HangTagProps) {
  const stringLength = Math.min(120, Math.max(24, drop))
  const card = (
    <>
      <span aria-hidden="true" className="mx-auto block w-0.5 bg-brand-900" style={{ height: stringLength }} />
      <span
        data-part="card"
        className={cn(
          'tag-cut relative block rounded-m px-[18px] pt-[46px] pb-[18px] drop-shadow-[0_14px_14px_rgb(29_12_51/0.35)]',
          tone === 'highlight' ? 'bg-highlight text-on-highlight' : 'bg-brand-100 text-brand-900',
          href && 'group-focus-visible:outline-3 group-focus-visible:outline-offset-3 group-focus-visible:outline-highlight-400',
        )}
      >
        <span
          aria-hidden="true"
          className="absolute top-3.5 left-1/2 -ml-2 size-4 rounded-full bg-landing-ground shadow-[0_0_0_4px_rgb(29_12_51/0.18)]"
        />
        <span className="block text-xs font-semibold tracking-[0.05em] uppercase opacity-80">{tenantLine}</span>
        <span className="mt-1.5 mb-3 block font-display text-2xl leading-none">{name}</span>
        {attributes.length > 0 && (
          <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-2.5 gap-y-0.5 text-sm tabular-nums">
            {attributes.slice(0, 3).map((attribute) => (
              <div key={attribute.name} className="contents">
                <dt className="opacity-75">{attribute.name}</dt>
                <dd className="m-0 font-medium">{attribute.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <span className="mt-3.5 flex items-center justify-between border-t-[1.5px] border-dashed border-current pt-2.5 text-sm font-medium">
          <span>{priceLabel}</span>
          <Stamp>{stampText}</Stamp>
        </span>
        {linkLabel && (
          <span className="mt-3 block text-sm font-semibold underline underline-offset-3">{linkLabel}</span>
        )}
      </span>
    </>
  )

  const classes = cn(
    'group relative block w-[220px] max-w-full origin-top no-underline',
    sway && 'motion-safe:animate-tag-sway motion-safe:hover:[animation-play-state:paused] motion-safe:focus-within:[animation-play-state:paused]',
    className,
  )

  if (href) {
    return (
      <Link to={href} aria-label={linkName ?? `Open the ${tenantLine} demo`} className={cn(classes, 'outline-none')}>
        {card}
      </Link>
    )
  }
  return <div className={classes}>{card}</div>
}
