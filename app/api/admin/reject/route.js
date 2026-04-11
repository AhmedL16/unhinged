import { NextResponse } from 'next/server'

export async function POST(request) {
  const { id } = await request.json()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  await fetch(
    `${supabaseUrl}/rest/v1/creators?id=eq.${id}`,
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