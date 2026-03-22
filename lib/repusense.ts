export async function getClientData() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
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
