import { getAllVideos } from './lib/supabase'
import Link from 'next/link'
function dailyShuffle(array) {
  if (!array || array.length === 0) return [];

  // 1. Create a seed based on today's date (e.g., "2026-04-14")
  const seed = new Date().toISOString().split('T')[0];
  
  // 2. Create a simple hash from the string
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0; 
  }

  // 3. Simple predictable shuffle
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Use the hash to create a pseudo-random index
    const j = Math.abs((hash + i) % (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    // Mutate hash slightly for the next iteration
    hash = (hash * 16807) % 2147483647;
  }
  
  return shuffled;
}


function getYouTubeId(url) {
  const match = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}
function getRelativeTime(dateStr) {
  const now = new Date()
  const date = new Date(dateStr)
  const seconds = Math.floor((now - date) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`
  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `${weeks} week${weeks === 1 ? '' : 's'} ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`
  const years = Math.floor(days / 365)
  return `${years} year${years === 1 ? '' : 's'} ago`
}

export default async function Home() {
  const videos = await getAllVideos()

  return (
    <main style={{backgroundColor: '#0a0a0a', minHeight: '100vh', paddingBottom: '80px', maxWidth: '1200px', margin: '0 auto'}}>

      <div style={{padding: '12px 12px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px'}}>
        {videos.map(video => {
          const id = getYouTubeId(video.youtube_url)
          if (!id) return null
          const thumbnail = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`

          return (
            <Link
              key={video.id}
              href={`/watch/${video.id}`}
              style={{display: 'block', textDecoration: 'none'}}
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
                  {video.duration && (
                    <span style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {video.duration}
                    </span>
                  )}
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
                  <p style={{
                    color: '#555',
                    fontSize: '11px',
                    margin: '2px 0 0'
                  }}>
                    {video.views} {video.views === 1 ? 'view' : 'views'} · {getRelativeTime(video.created_at)}
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