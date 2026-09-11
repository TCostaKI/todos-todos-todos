"use client"

import Link from "next/link"
import { useCart } from "@/lib/cart-context"

export default function Header() {
  const { totalQuantity } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Todos Todos Todos
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/produtos" className="hover:opacity-70">
            Loja
          </Link>
          <Link href="/carrinho" className="relative hover:opacity-70">
            Carrinho
            {totalQuantity > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                {totalQuantity}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
