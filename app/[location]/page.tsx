// app/[location]/page.tsx
import { getClientData, getSeoPages } from '@/lib/repusense'
import { generateSEO } from '@/lib/seo'
import type { Metadata } from 'next'
import BarberTemplate from '@/templates/barber/page'
import DivingTemplate from '@/templates/diving/page'
import RestaurantTemplate from '@/templates/restaurant/page'
import SeoPageLayout from '@/components/site/SeoPageLayout'

export const revalidate = 2592000

export async function generateStaticParams() {
  const pages = await getSeoPages()
  return pages
    .filter((p: any) => !p.service)
    .map((p: any) => ({ location: p.location }))
}

export async function generateMetadata({ params }: { params: { location: string } }): Promise<Metadata> {
  const [client, pages] = await Promise.all([getClientData(), getSeoPages()])
  const page = pages.find((p: any) => p.location === params.location && !p.service)
  const gbp = client.gbp_data || {}
  const cms = client.site_settings || {}
  const name = cms.hero_title || client.name
  const category = gbp.category || client.business_type || ''
  const location = params.location.replace(/-/g, ' ')

  return {
    ...generateSEO(client),
    title: page?.h1 || `${name} | ${category} ${location}`,
    description: page?.intro_text || `${name} — ${category} στην περιοχή ${location}. Κλείστε ραντεβού online τώρα.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.location}`,
    }
  }
}

export default async function LocationPage({ params }: { params: { location: string } }) {
  const [client, pages] = await Promise.all([getClientData(), getSeoPages()])
  const page = pages.find((p: any) => p.location === params.location && !p.service)

  const relatedLinks = pages
    .filter((p: any) => p.location === params.location && p.service)
    .map((p: any) => ({ label: p.h1 || p.service, href: `/${p.location}/${p.service}` }))

  // Αν δεν υπάρχει SEO page, δείξε κανονικό template
  if (!page) {
    const TemplateComponent = (() => {
      switch (client.business_type) {
        case 'Barber Shop':
        case 'Ομορφιά/Κουρεία': return BarberTemplate
        case 'Diving':
      case 'Κατάδυση':
        return DivingTemplate
      case 'Restaurant':
      case 'restaurant':
      case 'Εστιατόριο':
      case 'Εστιατόριο/Ταβέρνα':
        return RestaurantTemplate
      default:
        return BarberTemplate
      }
    })()
    return <TemplateComponent client={client} />
  }

  return (
    <SeoPageLayout
      client={client}
      page={page}
      location={params.location}
      relatedLinks={relatedLinks}
      relatedTitle={`Υπηρεσίες στην περιοχή ${params.location.replace(/-/g, ' ')}`}
    />
  )
}
