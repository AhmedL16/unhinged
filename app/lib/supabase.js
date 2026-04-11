export async function getCreatorBySlug(slug) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log('URL:', supabaseUrl)
  console.log('KEY:', supabaseKey ? 'exists' : 'missing')
  console.log('SLUG:', slug)

  const url = `${supabaseUrl}/rest/v1/creators?slug=eq.${slug}&select=*,creator_tags(tags(name))`

  console.log('FULL URL:', url)

  const res = await fetch(url, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`
    }
  })

  const data = await res.json()
  console.log('DATA FROM SUPABASE:', JSON.stringify(data))
  return data[0] || null
}