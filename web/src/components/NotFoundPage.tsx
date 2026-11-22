import { Link } from 'react-router'
import { Stamp } from '@/components/brand/Stamp'

export function NotFoundPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-3 p-6 text-center">
      <Stamp className="mb-4 text-lg">Nothing to see here</Stamp>
      <p className="font-mono text-sm text-ink-muted">404</p>
      <h1 className="display-m">Page not found</h1>
      <p className="text-ink-muted">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-2 font-semibold text-link underline underline-offset-4">
        Go to the home page
      </Link>
    </main>
  )
}
