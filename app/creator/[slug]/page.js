export const revalidate = 0
import { getCreatorBySlug } from '../../lib/supabase'
import VideoPlayer from '../../components/VideoPlayer'
import Link from 'next/link'

export default async function CreatorPage({ params }) {
  const { slug } = await params
  const creator = await getCreatorBySlug(slug)

  if (!creator) {
    return (
      <main style={{backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <p style={{color: '#666', fontSize: '14px'}}>creator not found.</p>
      </main>
    )
  }

  const tags = creator.creator_tags?.map(ct => ct.tags?.name).filter(Boolean) || []
  const videos = creator.videos || []

  return (
    <main style={{backgroundColor: '#0a0a0a', minHeight: '100vh', paddingBottom: '80px'}}>

      <div style={{height: '120px', backgroundColor: '#141414', borderBottom: '1px solid #1f1f1f'}} />

      <div style={{padding: '0 16px', marginTop: '-40px'}}>

        <div style={{
          width: '80px', height: '80px',
          borderRadius: '50%',
          backgroundColor: '#2a2a2a',
          border: '3px solid #0a0a0a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '28px', fontWeight: 700, color: '#fff',
          marginBottom: '12px'
        }}>
          {creator.name[0].toUpperCase()}
        </div>

        <h1 style={{color: '#fff', fontSize: '22px', fontWeight: 700, margin: '0 0 4px'}}>
          {creator.name}
        </h1>
        <p style={{color: '#666', fontSize: '13px', margin: '0 0 12px'}}>
          unhinged.com/creator/{creator.slug}
        </p>

        <p style={{color: '#aaa', fontSize: '14px', lineHeight: 1.6, margin: '0 0 16px'}}>
          {creator.bio}
        </p>

        <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px'}}>
          {tags.map(tag => (
            <span key={tag} style={{
              padding: '4px 12px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #2a2a2a',
              borderRadius: '99px',
              color: '#888',
              fontSize: '12px'
            }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{borderTop: '1px solid #1f1f1f', paddingTop: '20px'}}>
          <p style={{color: '#666', fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 16px'}}>
            Videos
          </p>
          <VideoPlayer videos={videos} />
        </div>

      </div>
    </main>
  )
}