// lib/seo.ts — Full SEO Stack
// Technical + On-Page + Local + Programmatic SEO

export function generateSEO(client: any) {
  const gbp = client.gbp_data || {}
  const cms = client.site_settings || {}

  const name = cms.hero_title || client.name
  const category = gbp.category || client.business_type || ''
  const address = cms.address || gbp.address || ''
  const city = address.split(',')[0]?.trim() || ''
  const phone = cms.phone || gbp.phone || ''
  const rating = gbp.rating || null
  const reviewCount = gbp.review_count || 0
  const heroPhoto = cms.hero_photo || gbp.photos?.[0]?.url || null
  const domain = client.custom_domain
    ? `https://${client.custom_domain}`
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://repusense-site-template.vercel.app'

  // Smart title — keyword rich για organic search
  const title = cms.seo_title ||
    `${name} | ${category}${city ? ` ${city}` : ''} | Κλείστε Online`

  // Rich description με keywords
  const description = cms.seo_description ||
    `${name} — ${category}${city ? ` στην περιοχή ${city}` : ''}. ${rating ? `⭐ ${rating}/5 από ${reviewCount} αξιολογήσεις Google.` : ''} Κλείστε ραντεβού online άμεσα.`

  return {
    title,
    description,
    keywords: [
      name,
      category,
      city,
      `${category} ${city}`,
      `${name} ραντεβού`,
      `${name} τιμές`,
      `${category} κοντά μου`,
    ].filter(Boolean).join(', '),
    authors: [{ name }],
    creator: name,
    publisher: name,
    metadataBase: new URL(domain),
    alternates: {
      canonical: domain,
      languages: {
        'el': domain,
        'el-GR': domain,
      }
    },
    openGraph: {
      title,
      description,
      url: domain,
      siteName: name,
      type: 'website' as const,
      locale: 'el_GR',
      ...(heroPhoto && {
        images: [{
          url: heroPhoto,
          width: 1200,
          height: 630,
          alt: `${name} - ${category}`,
        }]
      })
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      ...(heroPhoto && { images: [heroPhoto] })
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
        'max-video-preview': -1,
      }
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    },
    other: {
      'geo.region': 'GR',
      'geo.placename': city,
      'ICBM': '',
      'rating': 'general',
      'revisit-after': '7 days',
      'language': 'Greek',
    }
  }
}

export function generateSchema(client: any) {
  const gbp = client.gbp_data || {}
  const cms = client.site_settings || {}

  const name = cms.hero_title || client.name
  const address = cms.address || gbp.address || ''
  const city = address.split(',')[0]?.trim() || ''
  const phone = cms.phone || gbp.phone || ''
  const rating = gbp.rating || null
  const reviewCount = gbp.review_count || 0
  const heroPhoto = cms.hero_photo || gbp.photos?.[0]?.url || null
  const instagram = cms.instagram_url || ''
  const facebook = cms.facebook_url || ''
  const domain = client.custom_domain
    ? `https://${client.custom_domain}`
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://repusense-site-template.vercel.app'

  // Schema type map
  const schemaTypeMap: Record<string, string> = {
    'Barber Shop': 'HairSalon',
    'Ομορφιά/Κουρεία': 'HairSalon',
    'Beauty': 'BeautySalon',
    'Spa': 'DaySpa',
    'Diving': 'SportsActivityLocation',
    'Κατάδυση': 'SportsActivityLocation',
    'Εστιατόριο': 'Restaurant',
    'Restaurant': 'Restaurant',
    'Καφέ': 'CafeOrCoffeeShop',
    'Hotel': 'Hotel',
    'Ξενοδοχείο': 'Hotel',
    'Κατάλυμα': 'LodgingBusiness',
    'Γιατρός': 'Physician',
    'Ιατρείο': 'MedicalClinic',
    'Δικηγόρος': 'LegalService',
    'Λογιστής': 'AccountingService',
  }
  const schemaType = schemaTypeMap[client.business_type] || 'LocalBusiness'

  // Opening hours
  const daysMap: Record<string, string> = {
    'Δευτέρα': 'Monday', 'Τρίτη': 'Tuesday', 'Τετάρτη': 'Wednesday',
    'Πέμπτη': 'Thursday', 'Παρασκευή': 'Friday', 'Σάββατο': 'Saturday',
    'Κυριακή': 'Sunday', 'Mon': 'Monday', 'Tue': 'Tuesday', 'Wed': 'Wednesday',
    'Thu': 'Thursday', 'Fri': 'Friday', 'Sat': 'Saturday', 'Sun': 'Sunday',
  }

  const openingHours = (gbp.hours || [])
    .filter((h: any) => !h.closed && h.open && h.close)
    .map((h: any) => {
      const day = Object.keys(daysMap).find(k => h.day?.startsWith(k))
      if (!day) return null
      return `${daysMap[day]} ${h.open}-${h.close}`
    })
    .filter(Boolean)

  // Services as offers
  const services = [1,2,3,4,5,6,7,8].map(i => ({
    name: cms[`service_name_${i}`],
    price: cms[`service_price_${i}`],
  })).filter(s => s.name)

  const offers = services.map(s => ({
    '@type': 'Offer',
    name: s.name,
    ...(s.price && { price: s.price.replace(/[^0-9.]/g, ''), priceCurrency: 'EUR' }),
    availability: 'https://schema.org/InStock',
    url: domain,
  }))

  // Reviews
  const reviews = (gbp.reviews || [])
    .filter((r: any) => r?.text && r?.rating >= 4)
    .slice(0, 5)
    .map((r: any) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
      },
      author: {
        '@type': 'Person',
        name: r.author || 'Πελάτης',
      },
      reviewBody: r.text?.slice(0, 300),
    }))

  // sameAs links
  const sameAs = [
    gbp.maps_url || `https://www.google.com/maps/search/${encodeURIComponent(name)}`,
    instagram || null,
    facebook || null,
  ].filter(Boolean)

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    '@id': domain,
    name,
    url: domain,
    ...(phone && { telephone: phone }),
    ...(address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: address,
        addressLocality: city,
        addressCountry: 'GR',
      }
    }),
    ...(heroPhoto && { image: [heroPhoto] }),
    ...(rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(rating),
        reviewCount: String(reviewCount),
        bestRating: '5',
        worstRating: '1',
      }
    }),
    ...(openingHours.length && { openingHours }),
    ...(offers.length && { hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${name} Υπηρεσίες`,
      itemListElement: offers,
    }}),
    ...(reviews.length && { review: reviews }),
    ...(sameAs.length && { sameAs }),
    priceRange: cms.price_range || '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card',
    areaServed: {
      '@type': 'City',
      name: city || 'Greece',
    },
    inLanguage: 'el-GR',
  }

  // BreadcrumbList
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Αρχική',
        item: domain,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: name,
        item: domain,
      }
    ]
  }

  // WebSite schema για sitelinks searchbox
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url: domain,
    inLanguage: 'el-GR',
    publisher: {
      '@type': 'Organization',
      name,
      url: domain,
      ...(heroPhoto && { logo: {
        '@type': 'ImageObject',
        url: cms.logo || heroPhoto,
      }}),
    }
  }

  return [schema, breadcrumb, website]
}

// Programmatic SEO — generates location pages
export function generateLocationKeywords(client: any) {
  const gbp = client.gbp_data || {}
  const cms = client.site_settings || {}
  const address = cms.address || gbp.address || ''
  const category = gbp.category || client.business_type || ''
  const name = cms.hero_title || client.name

  const city = address.split(',')[0]?.trim() || ''
  const area = address.split(',')[1]?.trim() || ''

  return {
    primary: `${category} ${city}`,
    secondary: `${name} ${city}`,
    longtail: [
      `${category} ${city} τιμές`,
      `${category} ${city} ραντεβού`,
      `${category} κοντά μου`,
      `καλύτερο ${category} ${city}`,
      `${category} ${area}`,
    ].filter(k => k.trim().length > 3),
  }
}
