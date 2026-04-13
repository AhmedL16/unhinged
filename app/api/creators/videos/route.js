import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const creatorId = searchParams.get('creatorId')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const res = await fetch(
    `${supabaseUrl}/rest/v1/videos?creator_id=eq.${creatorId}&select=*&order=created_at.desc`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      }
    }
  )

  const data = await res.json()
  return NextResponse.json(data || [])
}

export async function POST(request) {
  const { creatorId, youtube_url, title } = await request.json()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY

  const videoId = youtube_url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/)?.[1]
  let duration = null

  if (videoId && apiKey) {
    const ytRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${apiKey}`
    )
    const ytData = await ytRes.json()
    const iso = ytData.items?.[0]?.contentDetails?.duration
    if (iso) {
      const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
      const h = parseInt(match[1] || 0)
      const m = parseInt(match[2] || 0)
      const s = parseInt(match[3] || 0)
      duration = h > 0
        ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
        : `${m}:${String(s).padStart(2, '0')}`
    }
  }

  const res = await fetch(`${supabaseUrl}/rest/v1/videos`, {
    method: 'POST',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: JSON.stringify({
      creator_id: creatorId,
      youtube_url,
      title,
      duration
    })
  })

  const data = await res.json()
  return NextResponse.json(data)
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const videoId = searchParams.get('videoId')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  await fetch(
    `${supabaseUrl}/rest/v1/videos?id=eq.${videoId}`,
    {
      method: 'DELETE',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      }
    }
  )

  return NextResponse.json({ success: true })
}