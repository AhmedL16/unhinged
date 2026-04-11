import VideoPlayer from '../../components/VideoPlayer'
import { getCreatorBySlug } from '../../lib/supabase'

function getYouTubeId(url) {
  const match = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

export default async function CreatorPage({ params }) {
  const { slug } = await params
  const creator = await getCreatorBySlug(slug)

  if (!creator) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-500 text-sm">creator not found.</p>
      </main>
    )
  }

  const tags = creator.creator_tags?.map(ct => ct.tags?.name).filter(Boolean) || []
  const videos = creator.videos || []
  console.log('VIDEOS ON PAGE:', JSON.stringify(videos))
videos.forEach(v => {
  console.log('ID extracted:', getYouTubeId(v.youtube_url))
})

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="h-32 bg-zinc-800 w-full" />

      <div className="px-4 pb-12 max-w-xl mx-auto">

        <div className="-mt-12 mb-4">
          <div className="w-24 h-24 rounded-full bg-zinc-700 border-4 border-zinc-950 flex items-center justify-center text-3xl font-bold">
            {creator.name[0].toUpperCase()}
          </div>
        </div>

        <div className="mb-4">
          <h1 className="text-2xl font-bold">{creator.name}</h1>
          <p className="text-zinc-400 text-sm mt-1">unhinged.com/creator/{creator.slug}</p>
        </div>

        <p className="text-zinc-300 text-base leading-relaxed mb-6">
          {creator.bio}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-full border border-zinc-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="border-t border-zinc-800 pt-6">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
            Videos
          </h2>
          <VideoPlayer videos={videos} />
        </div>

      </div>
    </main>
  )
}