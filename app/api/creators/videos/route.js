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
      title
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