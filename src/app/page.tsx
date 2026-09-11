import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import ProductCard from "@/components/ProductCard"
import Logo from "@/components/Logo"
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
      <section className="overflow-hidden border-b border-navy/10 bg-navy text-cream">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col items-start gap-6">
            <Logo variant="white" height={90} />
            <p className="max-w-md text-lg text-cream/80">
              Não aceitamos um mundo de exclusão. Acreditamos num caminho onde
              cabem todos os rostos, todas as cores, todas as histórias.
            </p>
            <p className="font-logo text-2xl text-orange">Veste a tua humanidade.</p>
            <Link
              href="/produtos"
              className="rounded-full bg-orange px-6 py-3 text-sm font-semibold text-navy-dark hover:brightness-95"
            >
              Ver coleção
            </Link>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
            <Image
              src="/brand/hero-sunset.jpg"
              alt="Todos Todos Todos — pôr do sol"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-navy">Novidades</h2>
          <Link href="/produtos" className="text-sm text-navy/60 hover:opacity-70">
            Ver todos
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="border-t border-navy/10 bg-cream py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="font-logo text-3xl text-navy">
            Mais do que uma marca, um movimento.
          </p>
          <p className="mt-4 text-navy/70">
            TODOS não é só uma palavra. TODOS é uma escolha. TODOS é um futuro
            possível.
          </p>
        </div>
      </section>
    </div>
  )
}
