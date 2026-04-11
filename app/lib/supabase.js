export async function getCreatorBySlug(slug) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const url = `${supabaseUrl}/rest/v1/creators?slug=eq.${slug}&select=*,creator_tags(tags(name))`

  const res = await fetch(url, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`
    }
  })

  const data = await res.json()
  return data[0] || null
}

export async function getAllCreators() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const url = `${supabaseUrl}/rest/v1/creators?select=*,creator_tags(tags(name))`

  const res = await fetch(url, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`
    }
  })

  const data = await res.json()
  return data || []
}