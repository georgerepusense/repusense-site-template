// components/site/SeoPageLayout.tsx
import Link from 'next/link'

interface SeoPageLayoutProps {
  client: any
  page: {
    h1: string
    intro_text: string
    cta_text: string
  }
  location: string
  service?: string
  relatedLinks: { label: string, href: string }[]
  relatedTitle: string
}

export default function SeoPageLayout({
  client,
  page,
  location,
  service,
  relatedLinks,
  relatedTitle,
}: SeoPageLayoutProps) {
  const cms = client.site_settings || {}
  const gbp = client.gbp_data || {}
  const brand = cms.brand_color || '#1a1a2e'
  const name = cms.hero_title || client.name
  const phone = cms.phone ? `+${cms.phone.replace(/^\+/, '')}` : ''
  const whatsapp = cms.whatsapp ? cms.whatsapp.replace(/^\+/, '') : ''
  const instagram = cms.instagram_url || ''
  const facebook = cms.facebook_url || ''
  const rating = gbp.rating || ''
  const reviewCount = gbp.review_count || 0
  const reviews = (gbp.reviews || []).slice(0, 3)
  const galleryPhotos = [1,2,3,4,5,6]
    .map(i => cms[`gallery_photo_${i}`])
    .filter(Boolean)
    .slice(0, 6)

  const isDark = isDarkColor(brand)
  const textColor = isDark ? '#ffffff' : '#1a1a2e'
  const mutedColor = isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.6)'

  return (
    <div style={{ fontFamily: 'var(--font-geist-sans, system-ui, sans-serif)', background: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>

      {/* NAVBAR */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#0a0a0a',
        borderBottom: `1px solid ${brand}33`,
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', color: '#fff', textTransform: 'uppercase' }}>
            {name}
          </div>
          {cms.business_type && (
            <div style={{ fontSize: 10, color: brand, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {cms.business_type}
            </div>
          )}
        </Link>
        <a href={`tel:${phone}`} style={{
          background: brand,
          color: textColor,
          padding: '10px 20px',
          borderRadius: 6,
          fontSize: 13,
          fontWeight: 700,
          textDecoration: 'none',
          letterSpacing: '0.05em',
        }}>
          ΚΡΑΤΗΣΗ
        </a>
      </nav>

      {/* HERO */}
      <div style={{
        padding: '80px 24px 60px',
        textAlign: 'center',
        borderBottom: `1px solid #ffffff15`,
        background: `linear-gradient(180deg, ${brand}22 0%, transparent 100%)`,
      }}>
        {rating && (
          <div style={{ fontSize: 13, color: brand, marginBottom: 16, letterSpacing: '0.1em' }}>
            ★ {rating} ({reviewCount} κριτικές)
          </div>
        )}
        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 52px)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: 20,
          letterSpacing: '-0.02em',
        }}>
          {page.h1}
        </h1>
        <p style={{
          fontSize: 17,
          color: '#ffffffaa',
          maxWidth: 580,
          margin: '0 auto 32px',
          lineHeight: 1.7,
        }}>
          {page.intro_text}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={`tel:${phone}`} style={{
            background: brand,
            color: textColor,
            padding: '14px 32px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
            letterSpacing: '0.05em',
          }}>
            {page.cta_text}
          </a>
          {whatsapp && (
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" style={{
              background: '#25D366',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
            }}>
              WhatsApp
            </a>
          )}
        </div>
      </div>

      {/* GALLERY */}
      {galleryPhotos.length > 0 && (
        <div style={{ padding: '60px 24px' }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', color: brand, textAlign: 'center', marginBottom: 32, textTransform: 'uppercase' }}>
            Gallery
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 12,
            maxWidth: 1000,
            margin: '0 auto',
          }}>
            {galleryPhotos.map((photo, i) => (
              <div key={i} style={{ aspectRatio: '4/3', borderRadius: 8, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
<img src={photo} alt={`${name} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy"/>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REVIEWS */}
      {reviews.length > 0 && (
        <div style={{ padding: '60px 24px', background: '#ffffff08', borderTop: '1px solid #ffffff10' }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', color: brand, textAlign: 'center', marginBottom: 32, textTransform: 'uppercase' }}>
            Κριτικές Google
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
            maxWidth: 1000,
            margin: '0 auto',
          }}>
            {reviews.map((review: any, i: number) => (
              <div key={i} style={{
                background: '#ffffff10',
                borderRadius: 12,
                padding: 20,
                border: '1px solid #ffffff15',
              }}>
                <div style={{ color: brand, marginBottom: 8, fontSize: 14 }}>{'★'.repeat(review.rating || 5)}</div>
                <p style={{ fontSize: 14, color: '#ffffffaa', lineHeight: 1.6, marginBottom: 12 }}>
                  &ldquo;{review.text?.slice(0, 150)}{(review.text?.length || 0) > 150 ? '...' : ''}&rdquo;
                </p>
                <div style={{ fontSize: 12, color: '#ffffff55' }}>{review.author_name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* INTERNAL LINKS */}
      {relatedLinks.length > 0 && (
        <div style={{ padding: '60px 24px', textAlign: 'center', borderTop: '1px solid #ffffff10' }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', color: brand, marginBottom: 24, textTransform: 'uppercase' }}>
            {relatedTitle}
          </h2>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {relatedLinks.map((link) => (
              <Link key={link.href} href={link.href} style={{
                padding: '10px 20px',
                background: '#ffffff10',
                border: `1px solid ${brand}44`,
                borderRadius: 8,
                fontSize: 14,
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 500,
              }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{
        padding: '40px 24px',
        borderTop: '1px solid #ffffff10',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 16, color: brand }}>
          {name}
        </div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
          {instagram && (
            <a href={instagram} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#ffffff77', textDecoration: 'none' }}>Instagram</a>
          )}
          {facebook && (
            <a href={facebook} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#ffffff77', textDecoration: 'none' }}>Facebook</a>
          )}
          {phone && (
            <a href={`tel:${phone}`} style={{ fontSize: 13, color: '#ffffff77', textDecoration: 'none' }}>{phone}</a>
          )}
        </div>
        <Link href="/" style={{ fontSize: 12, color: '#ffffff44', textDecoration: 'none' }}>
          ← Πίσω στην αρχική
        </Link>
      </footer>
    </div>
  )
}

// Helper: detect if color is dark
function isDarkColor(hex: string): boolean {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return true
  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  return (r * 299 + g * 587 + b * 114) / 1000 < 128
}
