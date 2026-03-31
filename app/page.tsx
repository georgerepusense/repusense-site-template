export const dynamic = 'force-dynamic'
import { getClientData, getTemplateType } from '@/lib/repusense'
import { generateSEO, generateSchema } from '@/lib/seo'
import type { Metadata } from 'next'
import BarberTemplate from '@/templates/barber/page'
import DivingTemplate from '@/templates/diving/page'
import RestaurantTemplate from '@/templates/restaurant/page'

export async function generateMetadata(): Promise<Metadata> {
  const client = await getClientData()
  return generateSEO(client)
}

export default async function Home() {
  const client = await getClientData()
  const schemas = generateSchema(client)

  const templates: Record<string, any> = {
    barber: BarberTemplate,
    diving: DivingTemplate,
    restaurant: RestaurantTemplate,
  }

  const templateType = getTemplateType(client.business_type)
  const TemplateComponent = templates[templateType] || BarberTemplate

  return (
    <>
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
