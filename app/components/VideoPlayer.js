'use client'

function getYouTubeId(url) {
  const match = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

export default function VideoPlayer({ videos }) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
      {videos.map(video => {
        const id = getYouTubeId(video.youtube_url)
        if (!id) return null
        return (
          <div key={video.id} style={{
            backgroundColor: '#141414',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid #1f1f1f'
          }}>
            <div style={{position: 'relative', paddingTop: '56.25%'}}>
              <iframe
                src={`https://www.youtube.com/embed/${id}?modestbranding=1&rel=0`}
                title={video.title}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none'}}
              />
            </div>
            <div style={{padding: '10px 12px'}}>
              <p style={{color: '#fff', fontSize: '13px', fontWeight: 500, margin: 0}}>
                {video.title}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}