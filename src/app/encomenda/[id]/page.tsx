"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { formatPriceCents } from "@/lib/types"

type OrderSummary = {
  id: string
  totalCents: number
  items: { name: string; size: string; quantity: number; priceCents: number }[]
}

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [order, setOrder] = useState<OrderSummary | null>(null)

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(`order-${id}`)
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from sessionStorage on mount
      if (raw) setOrder(JSON.parse(raw))
    } catch {
      // ignore
    }
  }, [id])

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Obrigado pela tua encomenda!</h1>
      <p className="mt-2 text-black/60">
        Referência: <span className="font-mono">{id.slice(0, 8)}</span>
      </p>

      {order && (
        <>
          <ul className="mt-10 divide-y divide-black/10 text-left">
            {order.items.map((item, i) => (
              <li key={i} className="flex justify-between py-3 text-sm">
                <span>
                  {item.name} ({item.size}) x{item.quantity}
                </span>
                <span>{formatPriceCents(item.priceCents * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between border-t border-black/10 pt-4 font-medium">
            <span>Total</span>
            <span>{formatPriceCents(order.totalCents)}</span>
          </div>
        </>
      )}

      <p className="mt-10 text-sm text-black/50">
        Vamos entrar em contacto para confirmar o pagamento e envio.
      </p>

      <Link
        href="/produtos"
        className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/80"
      >
        Continuar a comprar
      </Link>
    </div>
  )
}
