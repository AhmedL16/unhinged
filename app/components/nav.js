'use client'

import Link from 'next/link'

export default function Nav() {
  return (
    <header className="w-full px-4 py-3 flex items-center border-b border-zinc-800 bg-zinc-950 sticky top-0 z-50">
      <Link href="/" className="text-white font-bold text-xl tracking-tight">
        unhinged
      </Link>
    </header>
  )
}