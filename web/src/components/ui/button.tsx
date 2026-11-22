import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/utils'

// Button per DESIGN.md: label text (600), radius-m, 150ms changes, pressed moves 1px down.
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-m border border-transparent font-semibold leading-none transition-[background-color,border-color,color,box-shadow,translate] duration-150 ease-out cursor-pointer active:not-disabled:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
  {
    variants: {
      variant: {
        default: 'bg-brand-600 text-white shadow-raised hover:not-disabled:bg-brand-700 active:not-disabled:bg-brand-800',
        outline: 'border-gray-300 bg-surface-raised text-gray-800 hover:not-disabled:border-brand-400 hover:not-disabled:bg-brand-25 hover:not-disabled:text-brand-800',
        ghost: 'bg-transparent text-gray-800 hover:not-disabled:bg-gray-100',
        destructive: 'bg-error-600 text-white shadow-raised hover:not-disabled:bg-error-700',
      },
      size: {
        default: 'px-4 py-2.5 text-sm',
        sm: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export function Button({
  className,
  variant,
  size,
  ...props
}: ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

/** A link that looks like a button. */
export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>) {
  return <Link className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
