import { NextResponse } from 'next/server'

export async function POST(request) {
  const { name, slug, bio, video_url } = await request.json()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const res = await fetch(`${supabaseUrl}/rest/v1/creators`, {
    method: 'POST',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: JSON.stringify({ name, slug, bio })
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json({ error: data }, { status: 400 })
  }

  const creator = data[0]

  if (video_url) {
    await fetch(`${supabaseUrl}/rest/v1/videos`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        creator_id: creator.id,
        youtube_url: video_url,
        title: 'featured video'
      })
    })
  }

  return NextResponse.json({ success: true })
}