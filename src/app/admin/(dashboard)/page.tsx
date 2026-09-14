import { createClient } from "@/lib/supabase/server"
import { formatPriceCents, type OrderStatus, type OrderWithItems } from "@/lib/types"
import OrderStatusSelect from "@/components/admin/OrderStatusSelect"

async function getOrders(): Promise<OrderWithItems[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as OrderWithItems[]
}

export default async function AdminOrdersPage() {
  const orders = await getOrders()

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-navy">
        Encomendas ({orders.length})
      </h1>

      {orders.length === 0 ? (
        <p className="text-navy/60">Ainda não há encomendas.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const address = order.shipping_address as {
              fullName?: string
              phone?: string
              address?: string
              city?: string
              postalCode?: string
            } | null

            return (
              <div
                key={order.id}
                className="rounded-lg border border-navy/10 bg-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-navy/50">
                      {order.id.slice(0, 8)}
                    </p>
                    <p className="font-medium text-navy">
                      {address?.fullName ?? "—"}
                    </p>
                    <p className="text-sm text-navy/60">{order.contact_email}</p>
                    <p className="text-sm text-navy/60">{address?.phone}</p>
                    <p className="text-sm text-navy/60">
                      {address?.address}, {address?.city} {address?.postalCode}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <OrderStatusSelect
                      orderId={order.id}
                      status={order.status as OrderStatus}
                    />
                    <p className="text-xs text-navy/50">
                      {new Date(order.created_at).toLocaleString("pt-PT")}
                    </p>
                  </div>
                </div>

                <ul className="mt-4 divide-y divide-navy/10 border-t border-navy/10 pt-3 text-sm">
                  {order.order_items.map((item) => (
                    <li key={item.id} className="flex justify-between py-1.5">
                      <span>
                        {item.product_name}
                        {item.variant_label ? ` (${item.variant_label})` : ""} x
                        {item.quantity}
                      </span>
                      <span>
                        {formatPriceCents(item.unit_price_cents * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex justify-between border-t border-navy/10 pt-3 font-medium text-navy">
                  <span>Total</span>
                  <span>{formatPriceCents(order.total_cents)}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
