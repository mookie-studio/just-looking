import type { ComponentProps } from 'react'
import { controlClass, monoClass } from '@/components/ui/control'
import { cn } from '@/lib/utils'

type InputProps = ComponentProps<'input'> & {
  /** Codes such as SKUs and slugs: tabular figures, slightly tracked. */
  mono?: boolean
}

export function Input({ className, mono, ...props }: InputProps) {
  return (
    <input
      data-mono={mono ? '' : undefined}
      className={cn(controlClass, 'flex h-10 px-3 py-2', mono && monoClass, className)}
      {...props}
    />
  )
}
