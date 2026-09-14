"use client"

import { useTransition } from "react"
import { updateOrderStatus } from "@/app/admin/(dashboard)/actions"
import { ORDER_STATUSES, ORDER_STATUS_LABELS, type OrderStatus } from "@/lib/types"

export default function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: string
  status: OrderStatus
}) {
  const [pending, startTransition] = useTransition()

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as OrderStatus
        startTransition(() => updateOrderStatus(orderId, next))
      }}
      className="rounded border border-navy/20 bg-white px-2 py-1 text-sm text-navy disabled:opacity-50"
    >
      {ORDER_STATUSES.map((s) => (
        <option key={s} value={s}>
          {ORDER_STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  )
}
