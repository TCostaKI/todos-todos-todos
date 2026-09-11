"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import type { ProductVariant } from "@/lib/types"

export default function AddToCartForm({
  productId,
  productName,
  productSlug,
  priceCents,
  imageUrl,
  variants,
}: {
  productId: string
  productName: string
  productSlug: string
  priceCents: number
  imageUrl: string | null
  variants: ProductVariant[]
}) {
  const { addItem } = useCart()
  const router = useRouter()
  const [variantId, setVariantId] = useState(
    variants.find((v) => v.stock > 0)?.id ?? variants[0]?.id ?? ""
  )
  const [added, setAdded] = useState(false)

  const selectedVariant = variants.find((v) => v.id === variantId)
  const outOfStock = !selectedVariant || selectedVariant.stock <= 0

  const handleAdd = () => {
    if (!selectedVariant) return
    addItem({
      productId,
      variantId: selectedVariant.id,
      name: productName,
      slug: productSlug,
      size: selectedVariant.size,
      color: selectedVariant.color,
      priceCents,
      imageUrl,
      quantity: 1,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-navy">Tamanho</label>
        <div className="flex flex-wrap gap-2">
          {variants.map((v) => (
            <button
              key={v.id}
              type="button"
              disabled={v.stock <= 0}
              onClick={() => setVariantId(v.id)}
              className={`rounded-full border px-4 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-40 ${
                variantId === v.id
                  ? "border-navy bg-navy text-cream"
                  : "border-navy/20 text-navy hover:border-navy/40"
              }`}
            >
              {v.size}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={outOfStock}
        className="rounded-full bg-orange px-6 py-3 text-sm font-semibold text-navy-dark hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {outOfStock ? "Esgotado" : added ? "Adicionado ✓" : "Adicionar ao carrinho"}
      </button>

      {added && (
        <button
          type="button"
          onClick={() => router.push("/carrinho")}
          className="text-sm text-navy underline underline-offset-4 hover:opacity-70"
        >
          Ver carrinho
        </button>
      )}
    </div>
  )
}
