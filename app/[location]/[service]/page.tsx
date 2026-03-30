// app/[location]/[service]/page.tsx
import { getClientData, getSeoPages } from '@/lib/repusense'
import { generateSEO } from '@/lib/seo'
import type { Metadata } from 'next'
import BarberTemplate from '@/templates/barber/page'
import DivingTemplate from '@/templates/diving/page'
import SeoPageLayout from '@/components/site/SeoPageLayout'

export const revalidate = 2592000

export async function generateStaticParams() {
  const pages = await getSeoPages()
  return pages
    .filter((p: any) => p.location && p.service)
    .map((p: any) => ({ location: p.location, service: p.service }))
}

export async function generateMetadata({ params }: { params: { location: string, service: string } }): Promise<Metadata> {
  const [client, pages] = await Promise.all([getClientData(), getSeoPages()])
  const page = pages.find((p: any) => p.location === params.location && p.service === params.service)
  const location = params.location.replace(/-/g, ' ')
  const service = params.service.replace(/-/g, ' ')

  return {
    ...generateSEO(client),
    title: page?.h1 || `${service} ${location} | ${client.name}`,
    description: page?.intro_text || `${service} στην περιοχή ${location} από ${client.name}. Κλείστε ραντεβού online τώρα.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.location}/${params.service}`,
    }
  }
}

export default async function ServiceLocationPage({ params }: { params: { location: string, service: string } }) {
  const [client, pages] = await Promise.all([getClientData(), getSeoPages()])
  const page = pages.find((p: any) => p.location === params.location && p.service === params.service)

  const sameLocationLinks = pages
    .filter((p: any) => p.location === params.location && p.service && p.service !== params.service)
    .map((p: any) => ({ label: p.h1 || p.service, href: `/${p.location}/${p.service}` }))

  const sameServiceLinks = pages
    .filter((p: any) => p.service === params.service && p.location !== params.location)
    .map((p: any) => ({ label: p.h1 || p.location, href: `/${p.location}/${p.service}` }))

  const relatedLinks = [...sameLocationLinks, ...sameServiceLinks]

  // Αν δεν υπάρχει SEO page, δείξε κανονικό template
  if (!page) {
    const TemplateComponent = (() => {
      switch (client.business_type) {
        case 'Barber Shop':
        case 'Ομορφιά/Κουρεία': return BarberTemplate
        case 'Diving':
        case 'Κατάδυση': return DivingTemplate
        default: return BarberTemplate
      }
    })()
    return <TemplateComponent client={client} />
  }

  return (
    <SeoPageLayout
      client={client}
      page={page}
      location={params.location}
      service={params.service}
      relatedLinks={relatedLinks}
      relatedTitle="Δείτε επίσης"
    />
  )
}
