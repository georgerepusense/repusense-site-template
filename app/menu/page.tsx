import { getClientData } from '@/lib/repusense'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 3600

export default async function MenuPage() {
  const client = await getClientData()
  const cms = client.site_settings || {}
  const gbp = client.gbp_data || {}
  const brandColor = cms.brand_color || '#c9a96e'
  const siteName = cms.hero_title || client.name
  const phone = cms.phone || gbp.phone || ''
  const logo = cms.logo || ''

  const menuPhotos = [1,2,3,4,5,6]
    .map((i: number) => cms[`menu_photo_${i}`])
    .filter(Boolean)

  if (menuPhotos.length === 0) notFound()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cormorant+SC:wght@300;400&family=Jost:wght@200;300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --ink: #0b1a2e; --gold: ${brandColor}; --cream: #fdfaf4; --muted: #8a7e72; --bone: #ede8df; --f-disp: 'Cormorant Garamond', Georgia, serif; --f-sc: 'Cormorant SC', Georgia, serif; --f-body: 'Jost', sans-serif; }
        body { font-family: var(--f-body); font-weight: 300; background: var(--cream); color: var(--ink); }
        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.2rem 6vw; background: rgba(11,26,46,0.97); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(201,169,110,0.15); }
        .nav-brand { text-decoration: none; display: flex; flex-direction: column; }
        .nav-name { font-family: var(--f-sc); font-size: 1rem; letter-spacing: 0.35em; color: white; }
        .nav-sub { font-size: 0.55rem; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold); font-weight: 200; margin-top: 2px; }
        .nav-back { color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; font-family: var(--f-body); }
        .nav-back:hover { color: var(--gold); }
        .wrap { max-width: 900px; margin: 0 auto; padding: 8rem 6vw 6rem; }
        .page-eyebrow { font-size: 0.6rem; letter-spacing: 0.45em; text-transform: uppercase; color: var(--gold); font-weight: 200; margin-bottom: 0.8rem; }
        .page-title { font-family: var(--f-disp); font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 300; color: var(--ink); margin-bottom: 0.5rem; line-height: 1.1; }
        .page-sub { font-family: var(--f-disp); font-size: 1rem; color: var(--muted); font-style: italic; margin-bottom: 3rem; }
        .menu-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .menu-item { overflow: hidden; border-radius: 4px; }
        .menu-item img { width: 100%; height: auto; display: block; transition: transform 0.5s; }
        .menu-item:hover img { transform: scale(1.02); }
        .menu-item:first-child { grid-column: span 2; }
        .menu-item:first-child img { max-height: 600px; object-fit: cover; width: 100%; }
        .cta-box { margin-top: 4rem; padding: 2.5rem; background: var(--bone); text-align: center; border-radius: 4px; }
        .cta-box h3 { font-family: var(--f-disp); font-size: 1.8rem; font-weight: 300; margin-bottom: 0.5rem; }
        .cta-box p { font-family: var(--f-disp); font-style: italic; color: var(--muted); margin-bottom: 1.5rem; }
        .cta-box a { display: inline-block; padding: 0.9rem 2.5rem; border: 1px solid var(--ink); color: var(--ink); font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; text-decoration: none; transition: all 0.3s; margin: 0 0.5rem; }
        .cta-box a:hover { background: var(--ink); color: var(--cream); }
        .cta-box a.gold { border-color: var(--gold); color: var(--gold); }
        .cta-box a.gold:hover { background: var(--gold); color: var(--ink); }
        footer { background: #060e18; padding: 2rem 6vw; text-align: center; margin-top: 4rem; }
        .foot-copy { font-size: 0.6rem; color: rgba(255,255,255,0.15); font-family: var(--f-body); }
        @media (max-width: 768px) {
          .menu-grid { grid-template-columns: 1fr; }
          .menu-item:first-child { grid-column: span 1; }
          .cta-box a { display: block; margin: 0.5rem 0; }
        }
      `}}/>

      <nav>
        <Link href="/" className="nav-brand">
          {logo
            ? <img src={logo} alt={siteName} style={{ height:28, objectFit:'contain' }}/>
            : <span className="nav-name">{siteName}</span>
          }
          {gbp.category && <span className="nav-sub">{gbp.category}</span>}
        </Link>
        <Link href="/" className="nav-back">← Αρχική</Link>
      </nav>

      <div className="wrap">
        <div className="page-eyebrow">Τι σερβίρουμε</div>
        <h1 className="page-title">{cms.menu_title || 'Το Μενού μας'}</h1>
        <p className="page-sub">{cms.menu_subtitle || 'Ανακαλύψτε τις γεύσεις μας'}</p>
        <div className="menu-grid">
          {menuPhotos.map((photo: string, i: number) => (
            <div key={i} className="menu-item">
              <img src={photo} alt={`${siteName} μενού ${i+1}`} loading={i === 0 ? 'eager' : 'lazy'}/>
            </div>
          ))}
        </div>
        <div className="cta-box">
          <h3>Κάντε κράτηση σήμερα</h3>
          <p>Ελάτε να απολαύσετε τις γεύσεις μας από κοντά</p>
          <div>
            {phone && <a href={`tel:${phone}`}>📞 {phone}</a>}
            <a href="/#reservations" className="gold">Κράτηση online →</a>
          </div>
        </div>
      </div>
      <footer><span className="foot-copy">© {new Date().getFullYear()} {siteName}</span></footer>
    </>
  )
}
