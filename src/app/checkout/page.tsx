"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { formatPriceCents } from "@/lib/types"
import { createOrder } from "./actions"

export default function CheckoutPage() {
  const { items, totalCents, clear } = useCart()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center text-black/60">
        O teu carrinho está vazio.
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    try {
      const order = await createOrder(items, {
        fullName: String(formData.get("fullName") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        address: String(formData.get("address") ?? ""),
        city: String(formData.get("city") ?? ""),
        postalCode: String(formData.get("postalCode") ?? ""),
      })
      window.sessionStorage.setItem(`order-${order.id}`, JSON.stringify(order))
      clear()
      router.push(`/encomenda/${order.id}`)
    } catch {
      setError("Não foi possível finalizar a encomenda. Tenta novamente.")
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-semibold">Finalizar compra</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          required
          name="fullName"
          placeholder="Nome completo"
          className="col-span-2 rounded border border-black/20 px-4 py-2.5"
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          className="rounded border border-black/20 px-4 py-2.5"
        />
        <input
          required
          name="phone"
          placeholder="Telemóvel"
          className="rounded border border-black/20 px-4 py-2.5"
        />
        <input
          required
          name="address"
          placeholder="Morada"
          className="col-span-2 rounded border border-black/20 px-4 py-2.5"
        />
        <input
          required
          name="city"
          placeholder="Cidade"
          className="rounded border border-black/20 px-4 py-2.5"
        />
        <input
          required
          name="postalCode"
          placeholder="Código postal"
          className="rounded border border-black/20 px-4 py-2.5"
        />

        <div className="col-span-2 mt-4 rounded border border-black/10 bg-neutral-50 p-4 text-sm text-black/60">
          O pagamento será combinado após confirmarmos a tua encomenda. Vamos
          integrar pagamento online (ex: Stripe/MB Way) em breve.
        </div>

        <div className="col-span-2 flex items-center justify-between border-t border-black/10 pt-4">
          <span className="font-medium">Total</span>
          <span className="font-medium">{formatPriceCents(totalCents)}</span>
        </div>

        {error && <p className="col-span-2 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="col-span-2 mt-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/80 disabled:opacity-50"
        >
          {submitting ? "A processar..." : "Confirmar encomenda"}
        </button>
      </form>
    </div>
  )
}
