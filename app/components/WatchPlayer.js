'use client'

export default function WatchPlayer({ youtubeId, title }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      paddingTop: '56.25%',
      backgroundColor: '#000'
    }}>
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
        title={title}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none'
        }}
      />
    </div>
  )
}