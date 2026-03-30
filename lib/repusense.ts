export async function getClientData() {
  const clientId = process.env.CLIENT_ID || process.env.NEXT_PUBLIC_CLIENT_ID
  const apiKey = process.env.REPUSENSE_API_KEY
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://repusense.vercel.app'

  if (!clientId || !apiKey) {
    throw new Error(`Missing env vars: clientId=${clientId}, apiKey=${apiKey ? 'exists' : 'missing'}`)
  }

  const url = `${apiUrl}/api/public/client/${clientId}`
  
  const res = await fetch(url, {
    headers: { 'x-api-key': apiKey },
    cache: 'no-store'
  })
  
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`API error ${res.status}: ${text} — URL: ${url}`)
  }
  
  const data = await res.json()
  return data.client
}

export async function getSeoPages() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
  const apiKey = process.env.REPUSENSE_API_KEY
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://repusense.vercel.app'

  if (!clientId || !apiKey) return []

  const url = `${apiUrl}/api/public/seo-pages?clientId=${clientId}`

  try {
    const res = await fetch(url, {
      headers: { 'x-api-key': apiKey },
      next: { revalidate: 2592000 } // 30 days cache
    })

    if (!res.ok) {
      console.error('getSeoPages response error:', res.status, await res.text())
      return []
    }

    const data = await res.json()
    return data.pages?.map((p: any) => ({
      location: p.location,
      service: p.service || null,
      h1: p.content?.h1 || p.h1 || null,
      intro_text: p.content?.intro_text || p.intro_text || null,
      cta_text: p.content?.cta_text || p.cta_text || null,
    })) || []
  } catch (e) {
    console.error('getSeoPages error:', e)
    return []
  }
}
