// app/[location]/page.tsx
import { getClientData, getSeoPages } from '@/lib/repusense'
import { generateSEO } from '@/lib/seo'
import type { Metadata } from 'next'
import BarberTemplate from '@/templates/barber/page'
import DivingTemplate from '@/templates/diving/page'

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

  const relatedServices = pages
    .filter((p: any) => p.location === params.location && p.service)
    .map((p: any) => ({ label: p.h1 || p.service, href: `/${p.location}/${p.service}` }))

  const TemplateComponent = (() => {
    switch (client.business_type) {
      case 'Barber Shop':
      case 'Ομορφιά/Κουρεία': return BarberTemplate
      case 'Diving':
      case 'Κατάδυση': return DivingTemplate
      default: return BarberTemplate
    }
  })()

  const brandColor = client.site_settings?.brand_color || '#1a1a2e'
  
  const heroStyle: React.CSSProperties = {
    background: brandColor,
    padding: '32px 24px',
    textAlign: 'center',
    borderBottom: `3px solid ${brandColor}`,
  }

  const h1Style: React.CSSProperties = {
    fontSize: '42px',
    fontWeight: 800,
    color: '#fff',
    marginBottom: 16,
  }

  const pStyle: React.CSSProperties = {
    fontSize: 16,
    color: 'rgba(255,255,255,0.75)',
    maxWidth: 600,
    margin: '0 auto 24px',
  }

  const ctaStyle: React.CSSProperties = {
    display: 'inline-block',
    background: '#6366f1',
    color: '#fff',
    padding: '14px 32px',
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 15,
    textDecoration: 'none',
  }

  const internalStyle: React.CSSProperties = {
    padding: '40px 24px',
    background: '#f8f9fa',
    textAlign: 'center',
  }

  const linkStyle: React.CSSProperties = {
    padding: '10px 20px',
    background: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    fontSize: 14,
    color: '#6366f1',
    textDecoration: 'none',
    fontWeight: 600,
  }

  return (
    <>
      {page && (
        <div style={heroStyle}>
          <h1 style={h1Style}>{page.h1}</h1>
          <p style={pStyle}>{page.intro_text}</p>
          <a href="#booking" style={ctaStyle}>{page.cta_text}</a>
        </div>
      )}

      <TemplateComponent client={client} />

      {relatedServices.length > 0 && (
        <div style={internalStyle}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#1a1a2e' }}>
            Υπηρεσίες στην περιοχή {params.location.replace(/-/g, ' ')}
          </h2>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {relatedServices.map((link: any) => (
              <a key={link.href} href={link.href} style={linkStyle}>{link.label}</a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
