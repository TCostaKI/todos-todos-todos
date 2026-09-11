import Image from "next/image"

export default function Logo({
  variant = "navy",
  className,
  height = 40,
}: {
  variant?: "navy" | "white"
  className?: string
  height?: number
}) {
  const src = variant === "white" ? "/brand/logo-white.png" : "/brand/logo-navy.png"
  const width = Math.round(height * (900 / 847))

  return (
    <Image
      src={src}
      alt="Todos Todos Todos"
      width={width}
      height={height}
      className={className}
      priority
    />
  )
}
