import { cn } from '@/lib/utils'

/** The Just Looking wordmark in app headers, on the white top bar. */
export function AppLogo({ className }: { className?: string }) {
  return <img src="/brand/just-looking-wordmark.svg" alt="Just Looking" className={cn('h-6 w-auto', className)} />
}
