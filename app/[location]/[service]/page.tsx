export const dynamic = 'force-dynamic'
// app/[location]/[service]/page.tsx
// Programmatic SEO — location + service pages
// π.χ. /αθηνα/κουρεμα, /γλυφαδα/ξυρισμα, /αθηνα/open-water-diving

import { getClientData } from '@/lib/repusense'
import { generateSEO } from '@/lib/seo'
import type { Metadata } from 'next'
import BarberTemplate from '@/templates/barber/page'
import DivingTemplate from '@/templates/diving/page'

export async function generateMetadata({ params }: { params: { location: string, service: string } }): Promise<Metadata> {
  const client = await getClientData()
  const location = params.location.replace(/-/g, ' ')
  const service = params.service.replace(/-/g, ' ')
  const gbp = client.gbp_data || {}
  const cms = client.site_settings || {}
  const name = cms.hero_title || client.name
  const category = gbp.category || client.business_type || ''
  const domain = process.env.NEXT_PUBLIC_SITE_URL || ''

  return {
    ...generateSEO(client),
    title: `${service} ${location} | ${name} | Τιμές & Κράτηση`,
    description: `${service} στην περιοχή ${location} από ${name}. ⭐ ${gbp.rating || ''} — Κλείστε ραντεβού online τώρα. ${category}.`,
    alternates: {
      canonical: `${domain}/${params.location}/${params.service}`,
    }
  }
}

export default async function ServiceLocationPage({ params }: { params: { location: string, service: string } }) {
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
