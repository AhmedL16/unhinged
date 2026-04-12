import { getVideoById } from '../../lib/supabase'
import WatchPlayer from '../../components/WatchPlayer'
import Link from 'next/link'

export default async function WatchPage({ params }) {
  const { id } = await params
  const video = await getVideoById(id)

  if (!video) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <p className="text-zinc-500 text-sm">video not found.</p>
      </main>
    )
  }

  const youtubeId = video.youtube_url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/)?.[1]

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-20">

      <WatchPlayer youtubeId={youtubeId} title={video.title} />

      <div className="px-4 py-4">
        <h1 className="text-lg font-bold leading-snug">{video.title}</h1>
        <Link
          href={`/creator/${video.creators?.slug}`}
          className="text-zinc-400 text-sm mt-1 block hover:text-white transition-colors"
        >
          {video.creators?.name}
        </Link>
      </div>

    </main>
  )
}