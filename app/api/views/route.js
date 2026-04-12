import { NextResponse } from 'next/server'
import { incrementViews } from '../../lib/supabase'

export async function POST(request) {
  const { videoId } = await request.json()
  await incrementViews(videoId)
  return NextResponse.json({ success: true })
}