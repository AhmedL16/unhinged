export const revalidate = 0
import { getVideoById, getSimilarVideos } from '../../lib/supabase'
import WatchPlayer from '../../components/WatchPlayer'
import ViewTracker from '../../components/ViewTracker'
import Link from 'next/link'

function getYouTubeId(url) {
  const match = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

export default async function WatchPage({ params }) {
  const { id } = await params
  const video = await getVideoById(id)

  if (!video) {
    return (
      <main style={{backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <p style={{color: '#666', fontSize: '14px'}}>video not found.</p>
      </main>
    )
  }

  const youtubeId = getYouTubeId(video.youtube_url)
  const similarVideos = await getSimilarVideos(id, video.creators?.id)

  return (
    <main style={{backgroundColor: '#0a0a0a', minHeight: '100vh', paddingBottom: '80px'}}>
      <ViewTracker videoId={id} />
      <WatchPlayer youtubeId={youtubeId} title={video.title} />

      <div style={{padding: '16px'}}>
        <h1 style={{color: '#ffffff', fontSize: '16px', fontWeight: 600, lineHeight: 1.4, margin: '0 0 4px'}}>
          {video.title}
        </h1>
        <p style={{color: '#666', fontSize: '12px', margin: '0 0 12px'}}>
          {video.views} {video.views === 1 ? 'view' : 'views'}
        </p>

        <Link
          href={`/creator/${video.creators?.slug}`}
          style={{display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', padding: '12px', backgroundColor: '#141414', borderRadius: '12px', border: '1px solid #1f1f1f'}}
        >
          <div style={{width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '16px', fontWeight: 600, flexShrink: 0}}>
            {video.creators?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p style={{color: '#ffffff', fontSize: '14px', fontWeight: 500, margin: 0}}>
              {video.creators?.name}
            </p>
            <p style={{color: '#666', fontSize: '12px', margin: '2px 0 0'}}>
              view creator profile →
            </p>
          </div>
        </Link>
      </div>

      <div style={{padding: '0 16px 16px'}}>
        <p style={{color: '#666', fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 12px'}}>
          more videos
        </p>
        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
          {similarVideos.map(v => {
            const vid = getYouTubeId(v.youtube_url)
            if (!vid) return null
            const thumb = `https://img.youtube.com/vi/${vid}/mqdefault.jpg`
            return (
              <Link
                key={v.id}
                href={`/watch/${v.id}`}
                style={{display: 'flex', gap: '10px', textDecoration: 'none'}}
              >
                <img
                  src={thumb}
                  alt={v.title}
                  style={{width: '120px', height: '68px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0}}
                />
                <div>
                  <p style={{color: '#fff', fontSize: '13px', fontWeight: 500, margin: '0 0 4px', lineHeight: 1.3}}>
                    {v.title}
                  </p>
                  <p style={{color: '#666', fontSize: '11px', margin: 0}}>
                    {v.creators?.name}
                  </p>
                  <p style={{color: '#444', fontSize: '11px', margin: '2px 0 0'}}>
                    {v.views} views
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

    </main>
  )
}