"use server"

import { supabase } from "@/lib/supabase"
import type { CartItem } from "@/lib/types"

type ShippingInfo = {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
}

export async function createOrder(items: CartItem[], shipping: ShippingInfo) {
  if (items.length === 0) {
    throw new Error("O carrinho está vazio.")
  }

  const totalCents = items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0)
  const orderId = crypto.randomUUID()

  // Guest orders have no user_id, so RLS forbids reading the row back after
  // insert (SELECT policy only allows owners) — insert without `.select()`
  // and use the id we generated instead of one returned by the database.
  const { error: orderError } = await supabase.from("orders").insert({
    id: orderId,
    status: "pending",
    total_cents: totalCents,
    contact_email: shipping.email,
    shipping_address: {
      fullName: shipping.fullName,
      phone: shipping.phone,
      address: shipping.address,
      city: shipping.city,
      postalCode: shipping.postalCode,
    },
  })

  if (orderError) throw orderError

  const { error: itemsError } = await supabase.from("order_items").insert(
    items.map((item) => ({
      order_id: orderId,
      product_id: item.productId,
      variant_id: item.variantId,
      product_name: item.name,
      variant_label: item.size,
      quantity: item.quantity,
      unit_price_cents: item.priceCents,
    }))
  )

  if (itemsError) throw itemsError

  return {
    id: orderId,
    totalCents,
    items: items.map((item) => ({
      name: item.name,
      size: item.size,
      quantity: item.quantity,
      priceCents: item.priceCents,
    })),
  }
}
