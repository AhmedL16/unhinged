import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { name, slug, bio, tags, videos } = await request.json()

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    const creatorRes = await fetch(`${supabaseUrl}/rest/v1/creators`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
      },
      body: JSON.stringify({ name, slug, bio, approved: true })
    })

    const creatorData = await creatorRes.json()

    if (!creatorRes.ok) {
      return NextResponse.json({ error: 'failed to create creator', details: creatorData }, { status: 400 })
    }

    const creator = creatorData[0]

    for (const tag of tags) {
      try {
        const tagRes = await fetch(
          `${supabaseUrl}/rest/v1/tags?name=eq.${encodeURIComponent(tag)}&select=id`,
          {
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`
            }
          }
        )
        const tagData = await tagRes.json()
        let tagId

        if (tagData.length > 0) {
          tagId = tagData[0].id
        } else {
          const newTagRes = await fetch(`${supabaseUrl}/rest/v1/tags`, {
            method: 'POST',
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              'Content-Type': 'application/json',
              Prefer: 'return=representation'
            },
            body: JSON.stringify({ name: tag })
          })
          const newTagData = await newTagRes.json()
          tagId = newTagData[0].id
        }

        await fetch(`${supabaseUrl}/rest/v1/creator_tags`, {
          method: 'POST',
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ creator_id: creator.id, tag_id: tagId })
        })
      } catch (tagError) {
        console.error('tag error:', tagError)
      }
    }

    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY

    for (const video of videos) {
      if (!video.url) continue
      try {
        const videoId = video.url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/)?.[1]
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

        await fetch(`${supabaseUrl}/rest/v1/videos`, {
          method: 'POST',
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            creator_id: creator.id,
            youtube_url: video.url,
            title: video.title,
            duration
          })
        })
      } catch (videoError) {
        console.error('video error:', videoError)
      }
    }

    return NextResponse.json({ success: true, slug: creator.slug })
  } catch (error) {
    console.error('admin creator error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}