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