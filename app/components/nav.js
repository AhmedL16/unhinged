import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="w-full px-4 py-4 flex items-center justify-between border-b border-zinc-800 bg-zinc-950">
      <Link href="/" className="text-white font-bold text-lg tracking-tight">
        unhinged
      </Link>
      <Link
        href="/join"
        className="px-4 py-1.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-zinc-200 transition-colors"
      >
        join
      </Link>
    </nav>
  )
}