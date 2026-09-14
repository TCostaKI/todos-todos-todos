"use client"

import { useActionState } from "react"
import { login } from "../actions"
import Logo from "@/components/Logo"

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined)

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 px-4">
      <Logo variant="navy" height={56} />
      <form
        action={formAction}
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-navy/10 bg-white p-6"
      >
        <h1 className="text-lg font-semibold text-navy">Administração</h1>
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          className="rounded border border-navy/20 px-4 py-2.5"
        />
        <input
          required
          type="password"
          name="password"
          placeholder="Palavra-passe"
          className="rounded border border-navy/20 px-4 py-2.5"
        />
        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-orange px-6 py-2.5 text-sm font-semibold text-navy-dark hover:brightness-95 disabled:opacity-50"
        >
          {pending ? "A entrar..." : "Entrar"}
        </button>
      </form>
    </div>
  )
}
