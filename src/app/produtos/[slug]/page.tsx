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

  const images = [...product.product_images].sort((a, b) => a.position - b.position)
  const image = images[0]
  const variants = [...product.product_variants].sort((a, b) =>
    a.size.localeCompare(b.size)
  )

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-12 md:grid-cols-2">
      <div
        className={`grid gap-3 ${images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
      >
        {images.map((img) => (
          <div key={img.id} className="aspect-[4/5] overflow-hidden rounded-lg bg-cream">
            <Image
              src={img.url}
              alt={img.alt ?? product.name}
              width={800}
              height={1000}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        ))}
      </div>

      <div>
        {product.categories && (
          <p className="mb-2 text-sm text-navy/50">{product.categories.name}</p>
        )}
        <h1 className="text-2xl font-semibold text-navy">{product.name}</h1>
        <p className="mt-2 text-lg text-navy">{formatPriceCents(product.price_cents)}</p>
        {product.description && (
          <p className="mt-6 text-navy/70">{product.description}</p>
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
