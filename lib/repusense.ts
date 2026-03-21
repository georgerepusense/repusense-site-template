// RepuSense API Client
// Αλλάζεις μόνο τις παρακάτω τιμές για κάθε νέο client

export const CLIENT_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
  apiKey: process.env.REPUSENSE_API_KEY!,
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://repusense.vercel.app',
}

export async function getClientData() {
  const res = await fetch(
    `${CLIENT_CONFIG.apiUrl}/api/public/client/${CLIENT_CONFIG.clientId}`,
    {
      headers: { 'x-api-key': CLIENT_CONFIG.apiKey },
      next: { revalidate: 300 } // cache 5 λεπτά
    }
  )
  if (!res.ok) throw new Error('Failed to fetch client data')
  const data = await res.json()
  return data.client
}

