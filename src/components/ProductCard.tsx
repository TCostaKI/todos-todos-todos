import Link from "next/link"
import Image from "next/image"
import { formatPriceCents, type ProductSummary } from "@/lib/types"

export default function ProductCard({ product }: { product: ProductSummary }) {
  const image = product.product_images[0]

  return (
    <Link href={`/produtos/${product.slug}`} className="group block">
      <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
        {image && (
          <Image
            src={image.url}
            alt={image.alt ?? product.name}
            width={800}
            height={1000}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="font-medium">{product.name}</span>
        <span className="text-black/60">{formatPriceCents(product.price_cents)}</span>
      </div>
    </Link>
  )
}
