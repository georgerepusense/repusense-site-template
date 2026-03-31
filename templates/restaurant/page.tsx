// templates/restaurant/page.tsx
// ReservationForm - inline simple version
import CookieBanner from '@/components/site/CookieBanner'
import ReservationForm from '@/components/site/ReservationForm'
import Link from 'next/link'
import Image from 'next/image'
import { Cormorant_Garamond, Cormorant_SC, Jost } from 'next/font/google'

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'optional',
  variable: '--f-disp'
})
const cormorantSC = Cormorant_SC({ 
  subsets: ['latin'], 
  weight: ['300', '400'],
  display: 'optional',
  variable: '--f-sc'
})
const jost = Jost({ 
  subsets: ['latin'], 
  weight: ['200', '300', '400'],
  display: 'optional',
  variable: '--f-body'
})

function getTodayHours(hours: any[]) {
  if (!hours?.length) return null
  const days = ['Κυριακή','Δευτέρα','Τρίτη','Τετάρτη','Πέμπτη','Παρασκευή','Σάββατο']
  const today = days[new Date().getDay()]
  const h = hours.find((h: any) => h.day?.startsWith(today.slice(0,3)))
  if (!h) return null
  if (h.closed) return 'Σήμερα κλειστά'
  return `Σήμερα ${h.open || ''} – ${h.close || ''}`
}

function renderName(name: string) {
  const words = name.trim().split(/\s+/)
  return words.map((word, i) => (
    i % 2 === 1
      ? <span key={i}> <em>{word}</em></span>
      : <span key={i}>{i > 0 ? ' ' : ''}{word}</span>
  ))
}

export default function RestaurantTemplate({ client }: { client: any }) {
  const gbp = client.gbp_data || {}
  const cms = client.site_settings || {}
  const sections = client.cms_sections || []

  const heroSection    = sections.find((s: any) => s.type === 'hero')?.settings || {}
  const aboutSection   = sections.find((s: any) => s.type === 'about')?.settings || {}
  const gallerySection = sections.find((s: any) => s.type === 'gallery')?.settings || {}
  const bookingSection = sections.find((s: any) => s.type === 'booking')?.settings || {}
  const infoSection    = sections.find((s: any) => s.type === 'info')?.settings || {}

  const heroPhoto   = heroSection.photo || cms.hero_photo || null
  const brandColor  = heroSection.brand_color || cms.brand_color || '#c9a96e'
  const siteName    = heroSection.title || cms.hero_title || client.name
  const address     = infoSection.address || cms.address || gbp.address || ''
  const phone       = infoSection.phone || cms.phone || gbp.phone || ''
  const instagram   = infoSection.instagram_url || cms.instagram_url || ''
  const facebook    = infoSection.facebook_url || cms.facebook_url || ''
  const whatsapp    = infoSection.whatsapp || cms.whatsapp || phone.replace(/\D/g, '')
  const tripadvisor = cms.tripadvisor_url || ''
  const mapsUrl     = cms.maps_url || gbp.maps_url || ''
  const placeId     = client.gbp_place_id || ''
  const mapsApiKey  = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''
  const logo        = cms.logo || ''
  const rating      = gbp.rating || null
  const reviewCount = gbp.review_count || 0
  const reviews     = (gbp.reviews || []).filter((r: any) => r?.text).slice(0, 3)
  const todayHours  = getTodayHours(gbp.hours)

  const menuPhotos = [1,2,3,4,5,6].map(i => cms[`menu_photo_${i}`]).filter(Boolean)

  const galleryPhotos = [1,2,3,4,5,6]
    .map(i => gallerySection[`photo_${i}`] || cms[`gallery_photo_${i}`])
    .filter(Boolean)
    .map((url: string) => ({ url }))

  const philosophy = {
    title:  aboutSection.title || cms.philosophy_title || 'Η Φιλοσοφία μας',
    text:   aboutSection.text  || cms.philosophy_text  || '',
    eyebrow: cms.philosophy_eyebrow || 'Ποιοι είμαστε',
    photos: [
      aboutSection.photo_1 || cms.philosophy_photo_1 || null,
      aboutSection.photo_2 || cms.philosophy_photo_2 || null,
      cms.philosophy_photo_3 || null,
    ].filter(Boolean),
  }

  const show = {
    about:       cms.show_about       !== false,
    reviews:     cms.show_reviews     !== false,
    gallery:     cms.show_gallery     !== false,
    menu:        cms.show_menu        !== false && menuPhotos.length > 0,
    info:        cms.show_info        !== false,
    reservation: cms.show_reservation !== false,
  }
return (
    <>
      {heroPhoto && <link rel="preload" as="image" href={heroPhoto} fetchPriority="high"/>}

      <style dangerouslySetInnerHTML={{ __html: `
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --ink: #0b1a2e; --gold: ${brandColor}; --cream: #fdfaf4;
          --salt: #f4f1eb; --bone: #ede8df; --muted: #8a7e72;
          --f-disp: 'Cormorant Garamond', Georgia, serif;
--f-sc: 'Cormorant SC', Georgia, serif;
--f-body: 'Jost', sans-serif;
        }
        html { scroll-behavior: auto; }
        body { font-family: var(--f-body); font-weight: 300; background: var(--cream); color: var(--ink); overflow-x: hidden; }
        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.2rem 6vw; background: rgba(11,26,46,0.97); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(201,169,110,0.15); }
        .nav-brand { text-decoration: none; }
        .nav-name { font-family: var(--f-sc); font-size: 1.1rem; letter-spacing: 0.35em; color: white; display: block; }
        .nav-sub { font-size: 0.55rem; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold); font-weight: 200; }
        .nav-links { display: flex; align-items: center; gap: 2rem; }
        .nav-link { color: rgba(255,255,255,0.55); text-decoration: none; font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase; transition: color 0.3s; }
        .nav-link:hover { color: var(--gold); }
        .nav-cta { padding: 0.5rem 1.3rem; border: 1px solid rgba(201,169,110,0.5); color: var(--gold); font-size: 0.62rem; letter-spacing: 0.25em; text-transform: uppercase; text-decoration: none; transition: all 0.3s; font-weight: 200; }
        .nav-cta:hover { background: var(--gold); color: var(--ink); }
        .nav-hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
        .nav-hamburger span { display: block; width: 24px; height: 1.5px; background: rgba(255,255,255,0.7); transition: all 0.3s; }
        .mobile-menu { display: none; position: fixed; inset: 0; z-index: 99; background: rgba(11,26,46,0.99); flex-direction: column; align-items: center; justify-content: center; gap: 2.5rem; opacity: 0; pointer-events: none; transition: opacity 0.4s; }
        .mobile-menu.open { opacity: 1; pointer-events: all; }
        .mobile-menu a { font-family: var(--f-disp); font-size: 2.2rem; font-weight: 300; color: rgba(255,255,255,0.7); text-decoration: none; letter-spacing: 0.05em; }
        .mobile-menu .mobile-cta { margin-top: 1rem; padding: 0.8rem 2.5rem; border: 1px solid var(--gold); color: var(--gold) !important; font-family: var(--f-body) !important; font-size: 0.75rem !important; letter-spacing: 0.3em; text-transform: uppercase; }
        .mobile-menu-close { position: absolute; top: 1.5rem; right: 6vw; background: none; border: none; color: rgba(255,255,255,0.4); font-size: 1.5rem; cursor: pointer; }
        .hero { height: 100vh; min-height: 600px; position: relative; display: flex; align-items: flex-end; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(11,26,46,0.95) 0%, rgba(11,26,46,0.3) 55%, transparent 100%); }
        .hero-content { position: relative; z-index: 2; padding: 0 8vw 8vh; width: 100%; }
        .hero-eyebrow { font-size: 0.62rem; letter-spacing: 0.45em; text-transform: uppercase; color: var(--gold); font-weight: 200; margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem; }
        .hero-eyebrow::before { content: ''; display: block; width: 32px; height: 1px; background: var(--gold); }
        .hero-title { font-family: var(--f-disp); font-weight: 300; font-size: clamp(2.2rem, 6vw, 6rem); color: white; line-height: 1.05; margin-bottom: 1.5rem; }
        .hero-title em { font-style: italic; color: rgba(255,255,255,0.6); }
        .hero-meta { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
        .hero-rating { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: white; }
        .hero-rating .star { color: var(--gold); }
        .hero-hours { font-size: 0.75rem; color: rgba(255,255,255,0.5); }
        .hero-address { font-size: 0.75rem; color: rgba(255,255,255,0.4); }
        section { padding: 5rem 8vw; }
        .section-eyebrow { font-size: 0.6rem; letter-spacing: 0.45em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.8rem; }
        .section-title { font-family: var(--f-disp); font-weight: 300; font-size: clamp(1.8rem, 4vw, 3.5rem); line-height: 1.1; margin-bottom: 3rem; }
        .section-title.dark { color: white; }
        .section-title.light { color: var(--ink); }
        .philosophy-section { background: var(--cream); }
        .philosophy-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        .philosophy-text { font-family: var(--f-disp); font-size: 1.15rem; line-height: 1.9; color: var(--ink); font-style: italic; opacity: 0.8; margin-top: 1.5rem; }
        .philosophy-photos { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .phil-photo { overflow: hidden; }
        .phil-photo:first-child { grid-column: span 2; aspect-ratio: 16/8; }
        .phil-photo:not(:first-child) { aspect-ratio: 4/3; }
        .phil-photo img { width: 100%; height: 100%; object-fit: cover; }
        .phil-placeholder { width: 100%; min-height: 120px; background: var(--bone); display: flex; align-items: center; justify-content: center; }
        .reviews-section { background: var(--ink); }
        .reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .review-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1.5rem; }
        .review-stars { color: var(--gold); font-size: 0.9rem; margin-bottom: 0.8rem; }
        .review-text { font-size: 0.9rem; color: rgba(255,255,255,0.55); line-height: 1.8; margin-bottom: 1rem; font-family: var(--f-disp); font-style: italic; }
        .review-author { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3); }
        .menu-section { background: var(--cream); }
        .menu-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 2.5rem; }
        .menu-item { overflow: hidden; border-radius: 4px; }
        .menu-item img { width: 100%; object-fit: cover; aspect-ratio: 3/4; transition: transform 0.5s; }
        .menu-item:hover img { transform: scale(1.04); }
        .dishes-section { background: var(--ink); }
        .dishes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 3rem; }
        .dish-item { overflow: hidden; aspect-ratio: 1; }
        .dish-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; filter: brightness(0.85); }
        .dish-item:hover img { transform: scale(1.08); filter: brightness(1); }
        .info-section { background: var(--salt); }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        .info-title { font-family: var(--f-disp); font-size: clamp(1.8rem, 3.5vw, 3rem); font-weight: 300; color: var(--ink); margin-bottom: 2rem; line-height: 1.1; }
        .info-row { display: flex; gap: 1rem; margin-bottom: 1.2rem; align-items: flex-start; }
        .info-label { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.2rem; }
        .info-value { font-size: 0.95rem; color: var(--ink); }
        .info-value a { color: var(--ink); text-decoration: none; border-bottom: 1px solid rgba(0,0,0,0.15); }
        .hours-list { margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.3rem; }
        .hours-row { display: flex; justify-content: space-between; font-size: 0.82rem; gap: 1rem; }
        .hours-day { color: var(--muted); }
        .map-embed { width: 100%; height: 380px; border: none; border-radius: 12px; }
        .map-placeholder { width: 100%; height: 380px; background: var(--bone); border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .cta-section { background: var(--ink); text-align: center; }
        .cta-title { font-family: var(--f-disp); font-size: clamp(1.8rem, 4vw, 3.5rem); font-weight: 300; color: white; margin-bottom: 0.5rem; }
        .cta-title em { font-style: italic; color: var(--gold); }
        .cta-sub { color: rgba(255,255,255,0.4); font-size: 0.85rem; margin-bottom: 2.5rem; font-family: var(--f-disp); font-style: italic; }
        footer { background: #060e18; padding: 2.5rem 6vw 1.5rem; border-top: 1px solid rgba(255,255,255,0.05); }
        .foot-top { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 2rem; margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .foot-brand { font-family: var(--f-sc); font-size: 1.1rem; letter-spacing: 0.4em; color: rgba(255,255,255,0.5); text-decoration: none; display: block; margin-bottom: 0.5rem; }
        .foot-tagline { font-size: 0.75rem; color: rgba(255,255,255,0.2); font-family: var(--f-disp); font-style: italic; }
        .foot-links { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
        .foot-link { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.25); text-decoration: none; }
        .foot-social { display: flex; gap: 0.8rem; }
        .foot-social a { width: 36px; height: 36px; border: 1px solid rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.3); text-decoration: none; font-size: 0.7rem; transition: all 0.3s; }
        .foot-social a:hover { border-color: var(--gold); color: var(--gold); }
        .foot-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
        .foot-copy { font-size: 0.62rem; color: rgba(255,255,255,0.15); }
        .foot-legal { display: flex; gap: 1.5rem; }
        .foot-legal a { font-size: 0.6rem; color: rgba(255,255,255,0.15); text-decoration: none; }
        .wa-btn { position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 200; width: 56px; height: 56px; border-radius: 50%; background: #25d366; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(37,211,102,0.4); text-decoration: none; transition: transform 0.3s; }
        .wa-btn:hover { transform: scale(1.1); }
        .wa-btn svg { width: 28px; height: 28px; fill: white; }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-hamburger { display: flex; }
          .mobile-menu { display: flex; }
          .hero-title { font-size: clamp(2rem, 10vw, 3rem); }
          section { padding: 3.5rem 6vw; }
          .philosophy-inner { grid-template-columns: 1fr; gap: 2rem; }
          .reviews-grid { grid-template-columns: 1fr; }
          .menu-grid { grid-template-columns: repeat(2, 1fr); }
          .dishes-grid { grid-template-columns: repeat(2, 1fr); }
          .info-grid { grid-template-columns: 1fr; gap: 2rem; }
        }
      `}}/>

      {/* MOBILE MENU */}
      <div className="mobile-menu" id="mobile-menu">
        <button className="mobile-menu-close" id="menu-close">✕</button>
        <a href="/menu">Μενού</a>
        <a href="#philosophy">Φιλοσοφία</a>
        <a href="#info">Πληροφορίες</a>
        <a href="#reservations" className="mobile-cta">ΚΡΑΤΗΣΗ</a>
      </div>

      {/* NAV */}
      <nav>
        <a href="#" className="nav-brand">
          {logo
            ? <img src={logo} alt={siteName} style={{ height:32, objectFit:'contain' }}/>
            : <span className="nav-name">{siteName}</span>
          }
          {gbp.category && <span className="nav-sub">{gbp.category}</span>}
        </a>
        <div className="nav-links">
          <a href="/menu" className="nav-link">Μενού</a>
          <a href="#philosophy" className="nav-link">Φιλοσοφία</a>
          <a href="#info" className="nav-link">Πληροφορίες</a>
          <a href="#reservations" className="nav-cta">ΚΡΑΤΗΣΗ</a>
        </div>
        <button className="nav-hamburger" id="hamburger">
          <span/><span/><span/>
        </button>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-bg" style={!heroPhoto ? { background: 'linear-gradient(135deg, #0b1a2e 0%, #1e4976 100%)' } : {}}>
          {heroPhoto && (
  <Image src={heroPhoto} alt="" fill priority
    sizes="100vw"
    style={{ objectFit:'cover', objectPosition:'center 47%' }}/>
)}
        </div>
        <div className="hero-overlay"/>
        <div className="hero-content">
          <div className="hero-eyebrow">{heroSection.eyebrow || cms.hero_eyebrow || gbp.category || 'Εστιατόριο'}</div>
          <h1 className="hero-title">{renderName(siteName)}</h1>
          <div className="hero-meta">
            {rating && (
              <div className="hero-rating">
                <span className="star">★</span>
                <strong>{rating}</strong>
                {reviewCount > 0 && <span style={{ opacity:0.5, fontSize:'0.8rem' }}>({reviewCount} κριτικές)</span>}
              </div>
            )}
            {todayHours && <span className="hero-hours">{todayHours}</span>}
            {address && <span className="hero-address">📍 {address}</span>}
          </div>
        </div>
      </div>

      {/* ΦΙΛΟΣΟΦΙΑ */}
      {show.about && (
        <section className="philosophy-section" id="philosophy">
          <div className="philosophy-inner">
            <div>
              <div className="section-eyebrow">{philosophy.eyebrow}</div>
              <h2 className="section-title light">{philosophy.title}</h2>
              <p className="philosophy-text">{philosophy.text}</p>
            </div>
            <div className="philosophy-photos">
              {[0,1,2].map(i => (
                <div key={i} className="phil-photo">
                  {philosophy.photos[i]
                    ? <img src={philosophy.photos[i]} alt={`${siteName} ${i+1}`} loading="lazy"/>
                    : <div className="phil-placeholder"><span style={{ fontSize:'0.65rem', color:'var(--muted)', letterSpacing:'0.2em', textTransform:'uppercase' }}>Φωτογραφία {i+1}</span></div>
                  }
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* REVIEWS */}
      {show.reviews && reviews.length > 0 && (
        <section className="reviews-section" id="reviews">
          <div className="section-eyebrow">Τι λένε οι πελάτες</div>
          <h2 className="section-title dark">Κριτικές</h2>
          <div className="reviews-grid">
            {reviews.map((r: any, i: number) => (
              <div key={i} className="review-card">
                <div className="review-stars">{'★'.repeat(Math.min(r.rating || 5, 5))}</div>
                <p className="review-text">&ldquo;{r.text.slice(0, 200)}{r.text.length > 200 ? '…' : ''}&rdquo;</p>
                <div className="review-author">— {r.author}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ΜΕΝΟΥ */}
      {show.menu && (
        <section className="menu-section" id="menu">
          <div className="section-eyebrow">Το Μενού μας</div>
          <h2 className="section-title light">{cms.menu_title || 'Γεύσεις'}</h2>
          <div className="menu-grid">
            {menuPhotos.slice(0, 3).map((photo: string, i: number) => (
              <div key={i} className="menu-item">
                <img src={photo} alt={`${siteName} μενού ${i+1}`} loading="lazy"/>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* GALLERY */}
      {show.gallery && galleryPhotos.length > 0 && (
        <section className="dishes-section" id="dishes">
          <div className="section-eyebrow" style={{ color:'var(--gold)' }}>Gallery</div>
          <h2 className="section-title dark">{gallerySection.title || 'Φωτογραφίες'}</h2>
          <div className="dishes-grid">
            {galleryPhotos.map((p: any, i: number) => (
              <div key={i} className="dish-item">
                <img src={p.url} alt={`${siteName} - φωτογραφία ${i+1}`} loading="lazy"/>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* INFO */}
      {show.info && (
        <section className="info-section" id="info">
          <div className="info-grid">
            <div>
              <div className="section-eyebrow" style={{ color:'var(--muted)' }}>Πληροφορίες</div>
              <h2 className="info-title">Βρείτε μας</h2>
              {address && (
                <div className="info-row">
                  <span style={{ fontSize:'1rem', flexShrink:0 }}>📍</span>
                  <div>
                    <div className="info-label">Διεύθυνση</div>
                    <div className="info-value">{address}</div>
                  </div>
                </div>
              )}
              {phone && (
                <div className="info-row">
                  <span style={{ fontSize:'1rem', flexShrink:0 }}>📞</span>
                  <div>
                    <div className="info-label">Τηλέφωνο</div>
                    <div className="info-value"><a href={`tel:${phone}`}>{phone}</a></div>
                  </div>
                </div>
              )}
              {gbp.hours?.length > 0 && (
                <div className="info-row">
                  <span style={{ fontSize:'1rem', flexShrink:0 }}>🕐</span>
                  <div style={{ flex:1 }}>
                    <div className="info-label">Ώρες Λειτουργίας</div>
                    <div className="hours-list">
                      {gbp.hours.map((h: any, i: number) => (
                        <div key={i} className="hours-row">
                          <span className="hours-day">{h.day}</span>
                          <span>{h.closed ? 'Κλειστά' : `${h.open||''}–${h.close||''}`}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              {placeId && mapsApiKey ? (
                <iframe src={`https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=place_id:${placeId}&language=el`} className="map-embed" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
              ) : mapsUrl ? (
                <div className="map-placeholder"><a href={mapsUrl} target="_blank" rel="noopener noreferrer">Άνοιγμα στο Google Maps ↗</a></div>
              ) : (
                <div className="map-placeholder"><span style={{ color:'var(--muted)', fontSize:'0.85rem' }}>Χάρτης μη διαθέσιμος</span></div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      {show.reservation && (
        <section className="cta-section" id="reservations">
          <h2 className="cta-title">{bookingSection.cta_title || cms.cta_title || 'Κάντε'} <em>Κράτηση</em></h2>
          <p className="cta-sub">{todayHours || 'Κλείστε το τραπέζι σας online'}</p>
          <ReservationForm clientId={client.id} clientSlug={client.site_slug} phone={phone}/>
        </section>
      )}

      {/* FOOTER */}
      <footer>
        <div className="foot-top">
          <div>
            <a href="#" className="foot-brand">{siteName}</a>
            <span className="foot-tagline">{gbp.category || 'Εστιατόριο'}{address ? ` · ${address}` : ''}</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem', alignItems:'flex-end' }}>
            <div className="foot-links">
              <a href="/menu" className="foot-link">Μενού</a>
              <a href="#philosophy" className="foot-link">Φιλοσοφία</a>
              <a href="#info" className="foot-link">Πληροφορίες</a>
              {mapsUrl && <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="foot-link">Google Maps</a>}
              {tripadvisor && <a href={tripadvisor} target="_blank" rel="noopener noreferrer" className="foot-link">TripAdvisor</a>}
            </div>
            <div className="foot-social">
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              )}
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span className="foot-copy">© {new Date().getFullYear()} {siteName}. Με επιφύλαξη παντός δικαιώματος.</span>
          <div className="foot-legal">
            <a href="/privacy">Πολιτική Απορρήτου</a>
            <a href="/cookies">Cookies</a>
          </div>
        </div>
      </footer>

      {whatsapp && (
        <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="wa-btn" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      )}

      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var btn = document.getElementById('hamburger');
          var menu = document.getElementById('mobile-menu');
          var close = document.getElementById('menu-close');
          if (!btn || !menu) return;
          btn.addEventListener('click', function() { menu.classList.toggle('open'); btn.classList.toggle('open'); document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : ''; });
          if (close) close.addEventListener('click', function() { menu.classList.remove('open'); btn.classList.remove('open'); document.body.style.overflow = ''; });
          menu.querySelectorAll('a').forEach(function(a) {
            a.addEventListener('click', function() {
              menu.classList.remove('open'); btn.classList.remove('open'); document.body.style.overflow = '';
            });
          });
        })();
      `}}/>

      <CookieBanner />
    </>
  )
}