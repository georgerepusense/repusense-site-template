'use client'

interface Props {
  clientId: string
  clientSlug?: string
  phone?: string
}

export default function ReservationForm({ clientId }: Props) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://repusense.vercel.app'
  
  return (
    <iframe
      src={`${apiUrl}/widget/bookings/${clientId}`}
      style={{
        width: '100%',
        minHeight: '600px',
        border: 'none',
        borderRadius: '8px',
      }}
      title="Κράτηση"
    />
  )
}
