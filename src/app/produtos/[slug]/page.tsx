import { notFound } from "next/navigation"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { formatPriceCents, type ProductWithDetails } from "@/lib/types"
import AddToCartForm from "@/components/AddToCartForm"

async function getProduct(slug: string): Promise<ProductWithDetails | null> {
  const { data, error } = await supabase
    .from("products")
    .select(
      "*, product_images(*), product_variants(*), categories(*)"
    )
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle()

  if (error) throw error
  return data as ProductWithDetails | null
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) notFound()

  const image = product.product_images[0]
  const variants = [...product.product_variants].sort((a, b) =>
    a.size.localeCompare(b.size)
  )

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-12 md:grid-cols-2">
      <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
        {image && (
          <Image
            src={image.url}
            alt={image.alt ?? product.name}
            width={800}
            height={1000}
            className="h-full w-full object-cover"
            priority
          />
        )}
      </div>

      <div>
        {product.categories && (
          <p className="mb-2 text-sm text-black/50">{product.categories.name}</p>
        )}
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="mt-2 text-lg">{formatPriceCents(product.price_cents)}</p>
        {product.description && (
          <p className="mt-6 text-black/70">{product.description}</p>
        )}

        <div className="mt-8">
          <AddToCartForm
            productId={product.id}
            productName={product.name}
            productSlug={product.slug}
            priceCents={product.price_cents}
            imageUrl={image?.url ?? null}
            variants={variants}
          />
        </div>
      </div>
    </div>
  )
}
