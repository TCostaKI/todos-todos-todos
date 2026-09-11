import Logo from "./Logo"

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-navy/10 bg-navy py-12 text-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center">
        <Logo variant="white" height={44} />
        <p className="max-w-md text-sm text-cream/70">
          Mais do que uma marca, um movimento. Veste a tua humanidade.
        </p>
        <p className="text-xs text-cream/50">
          © {new Date().getFullYear()} Todos Todos Todos. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
