import { Link } from 'react-router'

/** The last line of every public catalog page: a quiet link to the Just Looking landing page. */
export function MadeWithJustLooking() {
  return (
    <p className="px-4 pt-6 pb-8 text-center text-sm text-ink-muted sm:px-6">
      <Link to="/" className="inline-flex items-center gap-2 rounded-s underline-offset-4 hover:text-ink hover:underline">
        {/* Decorative: the link text already names Just Looking. */}
        <img src="/brand/just-looking-mark-ink.svg" alt="" className="h-4 w-auto" />
        <span>Made with Just Looking</span>
      </Link>
    </p>
  )
}
