"use client"

import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import { formatPriceCents } from "@/lib/types"

export default function CartPage() {
  const { items, setQuantity, removeItem, totalCents } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center">
        <p className="text-navy/60">O teu carrinho está vazio.</p>
        <Link
          href="/produtos"
          className="mt-6 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-navy-dark hover:brightness-95"
        >
          Ver produtos
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-semibold text-navy">Carrinho</h1>

      <ul className="divide-y divide-navy/10">
        {items.map((item) => (
          <li key={item.variantId} className="flex gap-4 py-6">
            <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-cream">
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={160}
                  height={200}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <Link
                    href={`/produtos/${item.slug}`}
                    className="font-medium text-navy hover:opacity-70"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-navy/50">Tamanho: {item.size}</p>
                </div>
                <p className="font-medium text-navy">
                  {formatPriceCents(item.priceCents * item.quantity)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => setQuantity(item.variantId, Number(e.target.value))}
                  className="w-16 rounded border border-navy/20 px-2 py-1 text-sm text-navy"
                />
                <button
                  onClick={() => removeItem(item.variantId)}
                  className="text-sm text-navy/50 underline underline-offset-4 hover:text-navy"
                >
                  Remover
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between border-t border-navy/10 pt-6">
        <span className="text-lg font-medium text-navy">Total</span>
        <span className="text-lg font-medium text-navy">{formatPriceCents(totalCents)}</span>
      </div>

      <Link
        href="/checkout"
        className="mt-8 block w-full rounded-full bg-orange px-6 py-3 text-center text-sm font-semibold text-navy-dark hover:brightness-95"
      >
        Finalizar compra
      </Link>
    </div>
  )
}
