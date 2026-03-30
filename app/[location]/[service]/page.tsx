// app/[location]/[service]/page.tsx
import { getClientData, getSeoPages } from '@/lib/repusense'
import { generateSEO } from '@/lib/seo'
import type { Metadata } from 'next'
import BarberTemplate from '@/templates/barber/page'
import DivingTemplate from '@/templates/diving/page'

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
  const gbp = client.gbp_data || {}
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

  const sameLocationPages = pages
    .filter((p: any) => p.location === params.location && p.service && p.service !== params.service)
    .map((p: any) => ({ label: p.h1 || p.service, href: `/${p.location}/${p.service}` }))

  const sameServicePages = pages
    .filter((p: any) => p.service === params.service && p.location !== params.location)
    .map((p: any) => ({ label: p.h1 || p.location, href: `/${p.location}/${p.service}` }))

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

      {(sameLocationPages.length > 0 || sameServicePages.length > 0) && (
        <div style={{ padding: '40px 24px', background: '#f8f9fa' }}>
          {sameLocationPages.length > 0 && (
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#1a1a2e' }}>
                Άλλες υπηρεσίες στην περιοχή {params.location.replace(/-/g, ' ')}
              </h2>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                {sameLocationPages.map((link: any) => (
                  <a key={link.href} href={link.href} style={linkStyle}>{link.label}</a>
                ))}
              </div>
            </div>
          )}
          {sameServicePages.length > 0 && (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#1a1a2e' }}>
                {params.service.replace(/-/g, ' ')} σε άλλες περιοχές
              </h2>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                {sameServicePages.map((link: any) => (
                  <a key={link.href} href={link.href} style={linkStyle}>{link.label}</a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
