import { getAllVideos } from './lib/supabase'
import Link from 'next/link'

function getYouTubeId(url) {
  const match = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

export default async function Home() {
  const videos = await getAllVideos()

  return (
    <main style={{backgroundColor: '#0a0a0a', minHeight: '100vh', paddingBottom: '80px'}}>

      <div style={{padding: '12px 12px 0'}}>
        {videos.map(video => {
          const id = getYouTubeId(video.youtube_url)
          if (!id) return null
          const thumbnail = `https://img.youtube.com/vi/${id}/mqdefault.jpg`

          return (
            <Link
              key={video.id}
              href={`/watch/${video.id}`}
              style={{display: 'block', marginBottom: '20px', textDecoration: 'none'}}
            >
              <div style={{
                backgroundColor: '#141414',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #1f1f1f'
              }}>
                <div style={{position: 'relative', paddingTop: '56.25%'}}>
                  <img
                    src={thumbnail}
                    alt={video.title}
                    style={{
                      position: 'absolute',
                      top: 0, left: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div style={{padding: '10px 12px 12px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <div style={{
                      width: '32px', height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#2a2a2a',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontSize: '13px', fontWeight: 600,
                      flexShrink: 0
                    }}>
                      {video.creators?.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p style={{
                        color: '#ffffff',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: 1.3,
                        margin: 0
                      }}>
                        {video.title}
                      </p>
                      <p style={{
                        color: '#888',
                        fontSize: '12px',
                        margin: '2px 0 0'
                      }}>
                        {video.creators?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

    </main>
  )
}