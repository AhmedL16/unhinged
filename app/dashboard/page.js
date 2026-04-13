'use client'

import { useState, useEffect } from 'react'
import { createClient } from '../lib/auth'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [creator, setCreator] = useState(null)
  const [videos, setVideos] = useState([])
  const [videoUrl, setVideoUrl] = useState('')
  const [videoTitle, setVideoTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)

      const creatorRes = await fetch(`/api/creators/me?userId=${user.id}`)
      const creatorData = await creatorRes.json()
      setCreator(creatorData)

      if (creatorData?.id) {
        const videosRes = await fetch(`/api/creators/videos?creatorId=${creatorData.id}`)
        const videosData = await videosRes.json()
        setVideos(videosData)
      }

      setLoading(false)
    }
    load()
  }, [])

  async function handleAddVideo(e) {
    e.preventDefault()
    setAdding(true)

    await fetch('/api/creators/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        creatorId: creator.id,
        youtube_url: videoUrl,
        title: videoTitle
      })
    })

    const videosRes = await fetch(`/api/creators/videos?creatorId=${creator.id}`)
    const videosData = await videosRes.json()
    setVideos(videosData)
    setVideoUrl('')
    setVideoTitle('')
    setAdding(false)
  }

  async function handleDeleteVideo(videoId) {
    await fetch(`/api/creators/videos?videoId=${videoId}`, {
      method: 'DELETE'
    })
    setVideos(videos.filter(v => v.id !== videoId))
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <main style={{backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <p style={{color: '#666', fontSize: '14px'}}>loading...</p>
      </main>
    )
  }

  return (
    <main style={{backgroundColor: '#0a0a0a', minHeight: '100vh', paddingBottom: '80px', padding: '24px 16px 80px'}}>

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <div>
          <h1 style={{color: '#fff', fontSize: '20px', fontWeight: 700, margin: 0}}>
            your dashboard
          </h1>
          <p style={{color: '#666', fontSize: '13px', margin: '4px 0 0'}}>
            {creator?.approved ? '✓ approved creator' : '⏳ pending approval'}
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{color: '#666', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer'}}
        >
          sign out
        </button>
      </div>

      <div style={{backgroundColor: '#141414', borderRadius: '12px', border: '1px solid #1f1f1f', padding: '16px', marginBottom: '24px'}}>
        <p style={{color: '#666', fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 16px'}}>
          add a video
        </p>
        <form onSubmit={handleAddVideo} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <input
            type="text"
            value={videoTitle}
            onChange={e => setVideoTitle(e.target.value)}
            placeholder="video title"
            required
            style={{width: '100%', padding: '10px 14px', backgroundColor: '#0a0a0a', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none'}}
          />
          <input
            type="text"
            value={videoUrl}
            onChange={e => setVideoUrl(e.target.value)}
            placeholder="youtube url (e.g. https://youtu.be/...)"
            required
            style={{width: '100%', padding: '10px 14px', backgroundColor: '#0a0a0a', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none'}}
          />
          <button
            type="submit"
            disabled={adding}
            style={{width: '100%', padding: '10px', backgroundColor: '#fff', color: '#000', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', opacity: adding ? 0.5 : 1}}
          >
            {adding ? 'adding...' : 'add video'}
          </button>
        </form>
      </div>

      <div>
        <p style={{color: '#666', fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 12px'}}>
          your videos ({videos.length})
        </p>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          {videos.map(video => (
            <div key={video.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#141414', borderRadius: '10px', border: '1px solid #1f1f1f'}}>
              <div>
                <p style={{color: '#fff', fontSize: '13px', fontWeight: 500, margin: 0}}>
                  {video.title}
                </p>
                <p style={{color: '#444', fontSize: '11px', margin: '2px 0 0'}}>
                  {video.views} views
                </p>
              </div>
              <button
                onClick={() => handleDeleteVideo(video.id)}
                style={{color: '#ef4444', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0}}
              >
                delete
              </button>
            </div>
          ))}
          {videos.length === 0 && (
            <p style={{color: '#444', fontSize: '13px'}}>no videos yet. add your first one above.</p>
          )}
        </div>
      </div>

    </main>
  )
}