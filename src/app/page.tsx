import Link from "next/link"
import { supabase } from "@/lib/supabase"
import ProductCard from "@/components/ProductCard"
import type { ProductSummary } from "@/lib/types"

async function getFeaturedProducts(): Promise<ProductSummary[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(url, alt)")
    .eq("active", true)
    .order("created_at", { ascending: false })
    .limit(4)

  if (error) throw error
  return data as ProductSummary[]
}

export default async function Home() {
  const products = await getFeaturedProducts()

  return (
    <div>
      <section className="border-b border-black/10 bg-neutral-50">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-24">
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Todos Todos Todos
          </h1>
          <p className="max-w-md text-black/60">
            Roupa feita para durar. Peças simples, versáteis, para todos os dias.
          </p>
          <Link
            href="/produtos"
            className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/80"
          >
            Ver coleção
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Novidades</h2>
          <Link href="/produtos" className="text-sm text-black/60 hover:opacity-70">
            Ver todos
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
