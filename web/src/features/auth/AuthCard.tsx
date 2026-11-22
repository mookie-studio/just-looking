import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { HangTag } from '@/components/brand/HangTag'
import { Logo } from '@/components/brand/Logo'
import { AppLogo } from '@/components/AppLogo'

/**
 * Sign-in and invitation pages: an ink brand panel (wide screens only) beside the form card.
 * The panel is decoration; every text a user needs is in the form.
 */
export function AuthCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grid min-h-svh min-[860px]:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <aside
        aria-hidden="true"
        className="relative hidden flex-col justify-between overflow-hidden bg-landing-ground p-10 text-landing-ink min-[860px]:flex"
      >
        <Logo variant="reversed" className="h-8 self-start" />
        <div className="relative self-center">
          <span className="absolute -top-px left-1/2 h-0.5 w-72 -translate-x-1/2 bg-brand-900" />
          <HangTag
            tone="pale"
            tenantLine="Your shop · any business"
            name="Every product, its own attributes"
            attributes={[
              { name: 'Photos', value: 'Yes' },
              { name: 'Search', value: 'Yes' },
              { name: 'Inquiries', value: 'Yes' },
            ]}
            drop={72}
            sway
          />
        </div>
        <p className="max-w-[34ch] text-sm text-landing-ink-muted">A product catalog for any business. Visitors browse; you answer.</p>
      </aside>
      <main className="flex items-center justify-center bg-surface p-6">
        <div className="w-full max-w-sm space-y-6">
          <Link to="/" className="inline-block min-[860px]:hidden" aria-label="Just Looking home">
            <AppLogo />
          </Link>
          <div className="space-y-6 rounded-l border border-border bg-surface-raised p-6 shadow-raised">
            <h1 className="display-m">{title}</h1>
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
