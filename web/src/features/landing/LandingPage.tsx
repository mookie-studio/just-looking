import { Link } from 'react-router'
import { HangTag } from '@/components/brand/HangTag'
import { Logo } from '@/components/brand/Logo'
import { Stamp } from '@/components/brand/Stamp'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from './LanguageSwitcher'
import { LandingFooter, LandingSections, TryDemoButton } from './LandingSections'
import { useLandingLanguage } from './landing-language'

export { DEMO_HREF } from './LandingSections'

// Each tag hangs from the rail at its own drop (DESIGN.md: HangTag, 24 to 120px), alternating tones.
const tagLayout = [
  { tone: 'highlight', drop: 40 },
  { tone: 'pale', drop: 96 },
  { tone: 'highlight', drop: 60 },
] as const

/**
 * The landing page at `/` (#183): the offer, "Try the demo" and three hang tags from the Demo
 * tenants. Static content from `landing-copy.ts` only: no API calls, no admin or Supabase code.
 */
export function LandingPage() {
  const { language, copy, setLanguage } = useLandingLanguage()

  return (
    <div className="min-h-svh overflow-x-clip bg-landing-ground text-landing-ink">
      <title>{copy.meta.title}</title>
      <meta name="description" content={copy.meta.description} />
      <meta property="og:title" content={copy.meta.title} />
      <meta property="og:description" content={copy.meta.description} />

      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-8">
        <Link to="/" className="shrink-0 rounded-s focus-visible:outline-highlight-400">
          <Logo variant="reversed" className="h-6 sm:h-7" />
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          <LanguageSwitcher language={language} copy={copy} onChange={setLanguage} />
          <Link
            to="/login"
            className="rounded-m border border-white/50 px-4 py-2 text-sm font-semibold whitespace-nowrap text-landing-ink transition-colors hover:bg-landing-ink/10 focus-visible:outline-highlight-400"
          >
            {copy.nav.signIn}
          </Link>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-6 pb-16 sm:px-8 min-[860px]:grid-cols-[1.1fr_1fr] min-[860px]:gap-8 min-[860px]:pt-12">
          <div className="flex flex-col items-start gap-6">
            <h1 className="display-xl">
              {copy.hero.headlineBefore}
              <span className="box-decoration-clone rounded-s bg-highlight-400 px-[0.08em] text-brand-950">{copy.hero.headlineHighlight}</span>
              {copy.hero.headlineAfter}
            </h1>
            <p className="lede text-landing-ink-muted">{copy.hero.lede}</p>
            <p className="flex items-center gap-3 text-sm text-landing-ink">
              {/* The name is English in both languages; the line beside it explains the pun. */}
              <Stamp onInk className="shrink-0 text-[13px]">
                Just looking
              </Stamp>
              <span>{copy.hero.pun}</span>
            </p>
            <div className="flex flex-col items-start gap-3">
              <TryDemoButton label={copy.hero.tryDemo} />
              <p className="text-sm text-landing-ink-muted">{copy.hero.demoNote}</p>
            </div>
          </div>

          {/* The rail: a 2px string the three tags hang from. When the rail is narrower than the three
              tags side by side, they shrink and overlap (container sizes below) so none is clipped. */}
          <div className="@container relative mx-auto w-full max-w-[720px] pb-4">
            <div aria-hidden="true" className="h-0.5 w-full bg-brand-900" />
            <ul className="m-0 flex list-none justify-center gap-4 p-0 @max-[700px]:gap-0">
              {copy.demoTags.map((tag, index) => (
                <li
                  key={tag.slug}
                  className={cn(
                    'w-[220px] shrink-0 origin-top @max-[700px]:-mx-[30px] @max-[700px]:scale-[0.8] @max-[500px]:-mx-[52px] @max-[500px]:scale-[0.62] @max-[370px]:-mx-[60px] @max-[370px]:scale-[0.56]',
                    index === 1 && 'relative z-10',
                  )}
                >
                  <HangTag
                    tone={tagLayout[index]?.tone ?? 'highlight'}
                    drop={tagLayout[index]?.drop ?? 40}
                    sway
                    tenantLine={tag.tenantLine}
                    name={tag.name}
                    attributes={tag.attributes}
                    href={`/${tag.slug}`}
                    linkLabel={copy.tag.openDemo}
                    linkName={copy.tag.openDemoName.replace('{tenant}', tag.tenantLine)}
                    priceLabel={copy.tag.price}
                    stampText={copy.tag.stamp}
                    className={index === 1 ? '[animation-delay:-2s]' : index === 2 ? '[animation-delay:-4s]' : undefined}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
        <LandingSections copy={copy} />
      </main>
      <LandingFooter copy={copy} />
    </div>
  )
}
