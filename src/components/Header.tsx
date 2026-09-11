"use client"

import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import Logo from "./Logo"

export default function Header() {
  const { totalQuantity } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" aria-label="Todos Todos Todos">
          <Logo variant="navy" height={40} />
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-navy">
          <Link href="/produtos" className="hover:opacity-70">
            Loja
          </Link>
          <Link href="/carrinho" className="relative hover:opacity-70">
            Carrinho
            {totalQuantity > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-orange text-[10px] text-navy-dark">
                {totalQuantity}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
