import { NextResponse } from 'next/server'

export async function POST(request) {
  const { name, slug, userId } = await request.json()

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
    body: JSON.stringify({
      name,
      slug,
      user_id: userId,
      approved: false
    })
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json({ error: data }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}