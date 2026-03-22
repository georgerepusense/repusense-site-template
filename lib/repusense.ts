export async function getClientData() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
  const apiKey = process.env.REPUSENSE_API_KEY
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://repusense.vercel.app'

  if (!clientId || !apiKey) {
    throw new Error('Missing environment variables')
  }

  const res = await fetch(
    `${apiUrl}/api/public/client/${clientId}`,
    {
      headers: { 'x-api-key': apiKey },
      cache: 'no-store'
    }
  )
  if (!res.ok) throw new Error('Failed to fetch client data')
  const data = await res.json()
  return data.client
}
