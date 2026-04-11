'use client'

function getYouTubeId(url) {
  const match = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

export default function VideoPlayer({ videos }) {
  return (
    <div className="flex flex-col gap-6">
      {videos.map(video => {
        const id = getYouTubeId(video.youtube_url)
        if (!id) return null
        return (
          <div key={video.id}>
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${id}`}
                title={video.title}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute top-0 left-0 w-full h-full rounded-xl"
              />
            </div>
            <p className="mt-2 text-sm font-medium text-zinc-300">{video.title}</p>
          </div>
        )
      })}
    </div>
  )
}