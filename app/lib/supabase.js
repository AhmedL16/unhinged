export async function getCreatorBySlug(slug) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const creatorRes = await fetch(
    `${supabaseUrl}/rest/v1/creators?slug=eq.${slug}&select=*`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      }
    }
  )
  const creators = await creatorRes.json()
  const creator = creators[0]
  if (!creator) return null

  const videosRes = await fetch(
    `${supabaseUrl}/rest/v1/videos?creator_id=eq.${creator.id}&select=*`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      }
    }
  )
  const videos = await videosRes.json()

  const tagsRes = await fetch(
    `${supabaseUrl}/rest/v1/creator_tags?creator_id=eq.${creator.id}&select=*,tags(name)`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      }
    }
  )
  const creator_tags = await tagsRes.json()
  return { ...creator, videos, creator_tags }
}

export async function getAllCreators() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const res = await fetch(
    `${supabaseUrl}/rest/v1/creators?select=*,creator_tags(tags(name)),videos(id,title,youtube_url)&approved=eq.true`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      }
    }
  )

  const data = await res.json()
  return data || []
}
export async function getAllVideos() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const res = await fetch(
    `${supabaseUrl}/rest/v1/videos?select=*,creators(name,slug,approved)&creators.approved=eq.true&order=created_at.desc`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      }
    }
  )

  const data = await res.json()
  return data || []
}
export async function getVideoById(id) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const res = await fetch(
    `${supabaseUrl}/rest/v1/videos?id=eq.${id}&select=*,creators(name,slug)`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      }
    }
  )

  const data = await res.json()
  return data[0] || null
}
export async function incrementViews(videoId) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  await fetch(
    `${supabaseUrl}/rest/v1/rpc/increment_views`,
    {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ video_id: videoId })
    }
  )
}
export async function getSimilarVideos(videoId, creatorId) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const res = await fetch(
    `${supabaseUrl}/rest/v1/videos?id=neq.${videoId}&select=*,creators(name,slug)&order=views.desc&limit=6`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      }
    }
  )

  const data = await res.json()
  return Array.isArray(data) ? data : []
}
export async function getYouTubeDuration(videoId) {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${apiKey}`
  )
  const data = await res.json()
  const duration = data.items?.[0]?.contentDetails?.duration
  if (!duration) return null
  return formatDuration(duration)
}

function formatDuration(iso) {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  const h = parseInt(match[1] || 0)
  const m = parseInt(match[2] || 0)
  const s = parseInt(match[3] || 0)
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}