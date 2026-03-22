export const dynamic = 'force-dynamic'
// app/page.tsx
import { getClientData } from '@/lib/repusense'
import { generateSEO, generateSchema } from '@/lib/seo'
import type { Metadata } from 'next'
import BarberTemplate from '@/templates/barber/page'
import DivingTemplate from '@/templates/diving/page'

export async function generateMetadata(): Promise<Metadata> {
  const client = await getClientData()
  return generateSEO(client)
}

export default async function Home() {
  const client = await getClientData()
  const schemas = generateSchema(client)

  const TemplateComponent = (() => {
    switch (client.business_type) {
      case 'Barber Shop':
      case 'Ομορφιά/Κουρεία':
        return BarberTemplate
      case 'Diving':
      case 'Κατάδυση':
        return DivingTemplate
      default:
        return BarberTemplate
    }
  })()

  return (
    <>
      {/* Multiple Schema.org scripts */}
      {schemas.map((schema: any, i: number) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <TemplateComponent client={client} />
    </>
  )
}
