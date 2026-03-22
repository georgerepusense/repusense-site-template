export const dynamic = 'force-dynamic'
// app/[location]/page.tsx
// Programmatic SEO — αυτόματες landing pages ανά τοποθεσία
import { getClientData } from '@/lib/repusense'
import { generateSEO } from '@/lib/seo'
import type { Metadata } from 'next'
import BarberTemplate from '@/templates/barber/page'
import DivingTemplate from '@/templates/diving/page'

export async function generateMetadata({ params }: { params: { location: string } }): Promise<Metadata> {
  const client = await getClientData()
  const location = params.location.replace(/-/g, ' ')
  const gbp = client.gbp_data || {}
  const cms = client.site_settings || {}
  const name = cms.hero_title || client.name
  const category = gbp.category || client.business_type || ''

  return {
    ...generateSEO(client),
    title: `${name} | ${category} ${location} | Κλείστε Online`,
    description: `${name} — ${category} στην περιοχή ${location}. Κλείστε ραντεβού online τώρα.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.location}`,
    }
  }
}

export default async function LocationPage({ params }: { params: { location: string } }) {
  const client = await getClientData()

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

  return <TemplateComponent client={client} />
}
