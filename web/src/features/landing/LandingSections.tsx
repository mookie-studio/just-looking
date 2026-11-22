import { useState } from 'react'
import { Link } from 'react-router'
import { HangTag } from '@/components/brand/HangTag'
import { MookieStudioCredit } from '@/components/brand/MookieStudioCredit'
import { Stamp } from '@/components/brand/Stamp'
import { cn } from '@/lib/utils'
import type { LandingCopy } from './landing-copy'

/** The demo tenant that "Try the demo" opens (#176). */
export const DEMO_HREF = '/forja-hardware'

/** The tag-shaped primary button (DESIGN.md: Button, tag button), used in the hero and the closing call. */
export function TryDemoButton({ label }: { label: string }) {
  return (
    <Link
      to={DEMO_HREF}
      className="inline-flex items-center gap-3 rounded-m bg-highlight py-3 pr-5 pl-4 text-base font-semibold text-on-highlight shadow-tag transition-[translate,rotate,background-color] duration-150 hover:-translate-y-0.5 hover:-rotate-[1.5deg] focus-visible:outline-highlight-400 motion-reduce:transition-none"
    >
      <span aria-hidden="true" className="size-2.5 rounded-full bg-landing-ground" />
      {label}
    </Link>
  )
}

const sectionHeading = 'display-l text-landing-ink'

/**
 * How it works: one large pale tag. The front is what a Visitor sees, the back what an Admin edits.
 * "Turn the tag" flips it (at most 400ms, no animation under reduced motion); the hidden side is
 * inert, so only the visible side is read and focusable.
 */
function HowItWorks({ copy }: { copy: LandingCopy }) {
  const [turned, setTurned] = useState(false)
  const t = copy.howItWorks
  const face =
    'absolute inset-0 flex flex-col rounded-[8px] bg-brand-100 px-7 pt-16 pb-8 text-brand-900 [backface-visibility:hidden] [clip-path:polygon(22%_0,78%_0,100%_12%,100%_100%,0_100%,0_12%)]'

  return (
    <section aria-labelledby="how-it-works" className="flex flex-col items-center gap-8 text-center">
      <h2 id="how-it-works" className={sectionHeading}>
        {t.heading}
      </h2>
      <div className="flex flex-col items-center">
        <span aria-hidden="true" className="block h-12 w-0.5 bg-brand-900" />
        <div className="relative h-[380px] w-[300px] max-w-[calc(100vw-32px)] [perspective:1200px]">
          <div
            className={cn(
              'relative size-full [transform-style:preserve-3d] motion-safe:transition-transform motion-safe:duration-[400ms] motion-safe:ease-out',
              turned && '[transform:rotateY(180deg)]',
            )}
          >
            <Side className={face} hidden={turned} side="front" title={t.frontTitle} items={t.front} />
            <Side className={cn(face, '[transform:rotateY(180deg)]')} hidden={!turned} side="back" title={t.backTitle} items={t.back} />
          </div>
        </div>
      </div>
      <button
        type="button"
        aria-pressed={turned}
        onClick={() => setTurned((value) => !value)}
        className="rounded-m border border-white/50 px-4 py-2.5 text-sm font-semibold text-landing-ink transition-colors hover:bg-landing-ink/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight-400"
      >
        {t.turn}
      </button>
    </section>
  )
}

function Side({
  className,
  hidden,
  side,
  title,
  items,
}: {
  className: string
  hidden: boolean
  side: 'front' | 'back'
  title: string
  items: string[]
}) {
  return (
    <div className={className} data-side={side} aria-hidden={hidden} inert={hidden}>
      <span aria-hidden="true" className="absolute top-5 left-1/2 -ml-2.5 size-5 rounded-full bg-landing-ground" />
      <h3 className="mb-4 text-left text-xs font-semibold tracking-[0.05em] uppercase opacity-80">{title}</h3>
      <ul className="m-0 flex list-none flex-col gap-3 p-0 text-left text-base leading-snug font-semibold">
        {items.map((item) => (
          <li key={item} className="border-b-[1.5px] border-dashed border-brand-900/30 pb-3 last:border-0">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Any business: the three Demo tenants as a rail of tags, each with what makes its catalog different. */
function AnyBusiness({ copy }: { copy: LandingCopy }) {
  const t = copy.anyBusiness
  const lines: Record<string, string> = {
    'forja-hardware': t.forja,
    'lino-apparel': t.lino,
    'folio-books': t.folio,
  }
  return (
    <section aria-labelledby="any-business" className="flex flex-col items-center gap-6 text-center">
      <h2 id="any-business" className={sectionHeading}>
        {t.heading}
      </h2>
      <p className="lede text-landing-ink-muted">{t.lede}</p>
      <div className="w-full max-w-[760px]">
        <div aria-hidden="true" className="h-0.5 w-full bg-brand-900" />
        <ul className="m-0 flex list-none flex-wrap justify-center gap-x-6 gap-y-2 p-0">
          {copy.demoTags.map((tag, index) => (
            <li key={tag.slug} className="w-[220px] shrink-0">
              <HangTag
                tone={index % 2 === 0 ? 'pale' : 'highlight'}
                drop={index === 1 ? 64 : 32}
                tenantLine={tag.tenantLine}
                name={lines[tag.slug] ?? ''}
                href={`/${tag.slug}`}
                linkLabel={t.openCatalog}
                linkName={t.openCatalogName.replace('{tenant}', tag.tenantLine)}
                priceLabel={copy.tag.price}
                stampText={copy.tag.stamp}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** What it does not do: no prices, cart, payments or stock, with the stamp. */
function NotDo({ copy }: { copy: LandingCopy }) {
  return (
    <section
      aria-labelledby="not-do"
      className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-l border-2 border-dashed border-brand-50/40 px-6 py-10 text-center"
    >
      <Stamp onInk className="text-xl">
        {copy.tag.stamp}
      </Stamp>
      <h2 id="not-do" className="font-display text-3xl">
        {copy.notDo.heading}
      </h2>
      <p className="lede text-landing-ink-muted">{copy.notDo.body}</p>
    </section>
  )
}

function Closing({ copy }: { copy: LandingCopy }) {
  return (
    <section aria-labelledby="closing" className="flex flex-col items-center gap-8 text-center">
      <h2 id="closing" className={sectionHeading}>
        {copy.closing.heading}
      </h2>
      <TryDemoButton label={copy.hero.tryDemo} />
    </section>
  )
}

/** Below the landing's first screen (#184). */
export function LandingSections({ copy }: { copy: LandingCopy }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-18 px-4 pt-10 pb-18 sm:px-8">
      <HowItWorks copy={copy} />
      <AnyBusiness copy={copy} />
      <NotDo copy={copy} />
      <Closing copy={copy} />
    </div>
  )
}

/** The landing footer: Just Looking, Sign in and the year on the left; the maker's credit on the right. */
export function LandingFooter({ copy }: { copy: LandingCopy }) {
  return (
    <footer className="bg-brand-950 text-landing-ink-muted">
      {/* As in EntryHub's footer: the maker's credit on its own row, then the product line. */}
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-8">
        <div className="border-b border-white/20 pb-6">
          <MookieStudioCredit label={copy.footer.madeBy} />
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-4 px-4 py-6 text-sm sm:px-8">
        <p>{copy.footer.tagline}</p>
        <div className="flex items-center gap-x-6">
          <Link to="/login" className="rounded-s font-semibold text-landing-ink underline-offset-4 hover:underline focus-visible:outline-highlight-400">
            {copy.footer.signIn}
          </Link>
          <span className="tabular-nums">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
