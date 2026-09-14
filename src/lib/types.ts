import type { Tables } from "./database.types"

export type Category = Tables<"categories">
export type Product = Tables<"products">
export type ProductImage = Tables<"product_images">
export type ProductVariant = Tables<"product_variants">
export type Order = Tables<"orders">
export type OrderItem = Tables<"order_items">

export type OrderWithItems = Order & {
  order_items: OrderItem[]
}

export const ORDER_STATUSES = [
  "pending",
  "paid",
  "shipped",
  "completed",
  "cancelled",
] as const

export type OrderStatus = (typeof ORDER_STATUSES)[number]

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pendente",
  paid: "Pago",
  shipped: "Enviado",
  completed: "Concluído",
  cancelled: "Cancelado",
}

export type ProductWithDetails = Product & {
  product_images: ProductImage[]
  product_variants: ProductVariant[]
  categories: Category | null
}

export type ProductSummary = Product & {
  product_images: Pick<ProductImage, "url" | "alt">[]
}

export type CartItem = {
  productId: string
  variantId: string
  name: string
  slug: string
  size: string
  color: string | null
  priceCents: number
  imageUrl: string | null
  quantity: number
}

export function formatPriceCents(cents: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100)
}
