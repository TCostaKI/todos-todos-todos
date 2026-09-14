import Link from "next/link"
import Image from "next/image"
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
      {/* Hero */}
      <section className="relative flex min-h-[560px] items-end overflow-hidden">
        <Image
          src="/brand/hero-crowd.jpg"
          alt="Todos Todos Todos — comunidade ao pôr do sol"
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-4 pb-14 pt-32 text-cream">
          <p className="font-logo text-3xl text-orange sm:text-4xl">
            Veste a tua humanidade.
          </p>
          <p className="max-w-md text-cream/85">
            Não aceitamos um mundo de exclusão. Acreditamos num caminho onde
            cabem todos os rostos, todas as cores, todas as histórias.
          </p>
          <Link
            href="/produtos"
            className="mt-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-navy-dark hover:brightness-95"
          >
            Ver coleção
          </Link>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-lavender/40 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
          <div>
            <p className="font-logo text-3xl text-navy">
              Mais do que uma marca, um movimento.
            </p>
            <p className="mt-4 text-navy/70">
              A nossa missão é promover a cultura da inclusão universal
              através de produtos, campanhas e experiências que inspirem,
              eduquem e mobilizem.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-peach px-4 py-1.5 text-sm font-medium text-navy">
                Inclusão
              </span>
              <span className="rounded-full bg-mustard px-4 py-1.5 text-sm font-medium text-navy">
                Dignidade humana
              </span>
              <span className="rounded-full bg-mist px-4 py-1.5 text-sm font-medium text-navy">
                Bem comum
              </span>
            </div>
          </div>
          <div className="relative mx-auto aspect-[543/385] w-full max-w-lg">
            <Image
              src="/brand/crowd-illustration.png"
              alt="Ilustração de um grupo de pessoas diversas"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Products */}
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

      {/* Movement statement */}
      <section className="bg-mustard/25 px-4 py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <div className="relative aspect-[780/1175] w-full max-w-xs overflow-hidden rounded-2xl shadow-sm">
            <Image
              src="/brand/crowd-mosaic.jpg"
              alt="Todos — ilustração de uma multidão diversa"
              fill
              className="object-cover"
            />
          </div>
          <p className="max-w-md text-navy/80">
            TODOS não é só uma palavra. TODOS é uma escolha. TODOS é um futuro
            possível.
          </p>
        </div>
      </section>

      {/* Closing quote */}
      <section className="relative flex min-h-[380px] items-center justify-center overflow-hidden">
        <Image
          src="/brand/hero-sunset.jpg"
          alt="Todos Todos Todos — pôr do sol"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-dark/45" />
        <p className="relative max-w-lg px-4 text-center font-logo text-2xl text-cream sm:text-3xl">
          &ldquo;TODOS TODOS TODOS&rdquo; — veste a tua humanidade.
        </p>
      </section>
    </div>
  )
}
