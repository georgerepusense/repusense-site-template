export const dynamic = 'force-dynamic'
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getClientData } from '@/lib/repusense'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = await getClientData()
  const domain = client.custom_domain
    ? `https://${client.custom_domain}`
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://repusense-site-template.vercel.app'

  const cms = client.site_settings || {}
  const gbp = client.gbp_data || {}
  const address = cms.address || gbp.address || ''

  // Βασικές σελίδες
  const routes: MetadataRoute.Sitemap = [
    {
      url: domain,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]

  // Programmatic SEO pages — location based
  const city = address.split(',')[0]?.trim()
  if (city) {
    const businessType = client.business_type?.toLowerCase().replace(/ /g, '-') || 'business'
    routes.push({
      url: `${domain}/${businessType}-${city.toLowerCase().replace(/ /g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }

  return routes
}
