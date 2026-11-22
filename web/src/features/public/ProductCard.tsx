import { Link } from 'react-router'
import { StatusBadge } from '@/components/StatusBadge'
import { ProductImage } from '@/features/public/ProductImage'
import type { PublicProductItem } from '@/features/public/public-api'

export function FeaturedBadge({ className }: { className?: string }) {
  return <StatusBadge status="Featured" className={className} />
}

/** A product in the public grid, the Featured strip and Related products (DESIGN.md: ProductCard). No price, ever. */
export function ProductCard({ tenantSlug, product }: { tenantSlug: string; product: PublicProductItem }) {
  return (
    <Link
      to={`/${tenantSlug}/p/${product.slug}`}
      className="group grid h-full grid-rows-[auto_1fr] overflow-hidden rounded-l border border-border bg-surface-raised text-ink transition-[box-shadow,translate] duration-300 ease-out hover:border-brand-300 hover:shadow-raised motion-safe:hover:-translate-y-0.5"
    >
      <ProductImage
        src={product.mainImageUrl}
        alt={product.name}
        className="aspect-[4/3] rounded-none border-0 bg-surface-sunken"
      />
      <span className="grid content-start gap-1.5 p-4">
        <span className="text-base leading-snug font-semibold group-hover:underline">{product.name}</span>
        {product.isFeatured && <FeaturedBadge className="justify-self-start" />}
      </span>
    </Link>
  )
}
