import { getAllCreators } from './lib/supabase'
import Link from 'next/link'

export default async function Home() {
  const creators = await getAllCreators()

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-4 py-8 max-w-xl mx-auto">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">unhinged</h1>
        <p className="text-zinc-400 text-sm mt-1">real creators, no algorithm</p>
      </div>

      <div className="flex flex-col gap-4">
        {creators.map(creator => (
          <Link
            key={creator.slug}
            href={`/creator/${creator.slug}`}
            className="block p-4 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-zinc-600 transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                {creator.name[0].toUpperCase()}
              </div>
              <div>
                <p className="font-semibold">{creator.name}</p>
                <p className="text-zinc-500 text-xs">/{creator.slug}</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">{creator.bio}</p>
            <div className="flex flex-wrap gap-1 mt-3">
              {creator.creator_tags.map(ct => (
                <span
                  key={ct.tags.name}
                  className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-xs rounded-full"
                >
                  {ct.tags.name}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

    </main>
  )
}