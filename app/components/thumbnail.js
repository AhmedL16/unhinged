'use client'

export default function Thumbnail({ videoId, title }) {
  return (
    <img
      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
      alt={title}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        objectFit: 'cover'
      }}
    />
  )
}