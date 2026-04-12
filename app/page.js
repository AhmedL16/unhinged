import { getAllVideos } from './lib/supabase'
import Link from 'next/link'

function getYouTubeId(url) {
  const match = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

export default async function Home() {
  const videos = await getAllVideos()

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-20">

      <div className="grid grid-cols-2 gap-0.5">
        {videos.map(video => {
          const id = getYouTubeId(video.youtube_url)
          if (!id) return null
          const thumbnail = `https://img.youtube.com/vi/${id}/mqdefault.jpg`

          return (
            <div key={video.id} className="flex flex-col">
              <Link href={`/watch/${video.id}`}>
                <img
                  src={thumbnail}
                  alt={video.title}
                  className="w-full aspect-video object-cover"
                />
              </Link>
              <div className="px-2 py-2">
                <Link href={`/watch/${video.id}`}>
                  <p className="text-white text-sm font-medium leading-snug line-clamp-2">
                    {video.title}
                  </p>
                </Link>
                <Link href={`/creator/${video.creators?.slug}`}>
                  <p className="text-zinc-500 text-xs mt-1">
                    {video.creators?.name}
                  </p>
                </Link>
              </div>
            </div>
          )
        })}
      </div>

    </main>
  )
}