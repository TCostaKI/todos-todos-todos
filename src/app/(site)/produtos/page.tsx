import { supabase } from "@/lib/supabase"
import ProductCard from "@/components/ProductCard"
import type { Category, ProductSummary } from "@/lib/types"
import Link from "next/link"

async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from("categories").select("*").order("name")
  if (error) throw error
  return data
}

async function getProducts(categorySlug?: string): Promise<ProductSummary[]> {
  let query = supabase
    .from("products")
    .select("*, product_images(url, alt), categories!inner(slug)")
    .eq("active", true)
    .order("created_at", { ascending: false })

  if (categorySlug) {
    query = query.eq("categories.slug", categorySlug)
  }

  const { data, error } = await query
  if (error) throw error
  return data as unknown as ProductSummary[]
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>
}) {
  const { categoria } = await searchParams
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(categoria),
  ])

  const pastelTints = ["bg-peach/40", "bg-mustard/40", "bg-lavender/40", "bg-mist/40"]

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-semibold text-navy">Loja</h1>

      <div className="mb-10 flex flex-wrap gap-2">
        <Link
          href="/produtos"
          className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
            !categoria
              ? "border-navy bg-navy text-cream"
              : "border-transparent bg-navy/5 text-navy hover:bg-navy/10"
          }`}
        >
          Ver tudo
        </Link>
        {categories.map((c, i) => (
          <Link
            key={c.id}
            href={`/produtos?categoria=${c.slug}`}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
              categoria === c.slug
                ? "border-navy bg-navy text-cream"
                : `border-transparent text-navy hover:brightness-95 ${pastelTints[i % pastelTints.length]}`
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="text-navy/60">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
