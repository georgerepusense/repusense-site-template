import { getClientData } from '@/lib/repusense'
import Link from 'next/link'

export const revalidate = 86400

export default async function PrivacyPage() {
  const client = await getClientData()
  const cms = client.site_settings || {}
  const brandColor = cms.brand_color || '#c9a96e'
  const siteName = cms.hero_title || client.name

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cormorant+SC:wght@300;400&family=Jost:wght@200;300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --ink: #0b1a2e; --gold: ${brandColor}; --cream: #fdfaf4; --muted: #8a7e72; --f-disp: 'Cormorant Garamond', Georgia, serif; --f-sc: 'Cormorant SC', Georgia, serif; --f-body: 'Jost', sans-serif; }
        body { font-family: var(--f-body); font-weight: 300; background: var(--cream); color: var(--ink); }
        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.2rem 6vw; background: rgba(11,26,46,0.97); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(201,169,110,0.15); }
        .nav-name { font-family: var(--f-sc); font-size: 1rem; letter-spacing: 0.35em; color: white; text-decoration: none; }
        .nav-back { color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; font-family: var(--f-body); }
        .nav-back:hover { color: var(--gold); }
        .wrap { max-width: 740px; margin: 0 auto; padding: 8rem 6vw 6rem; }
        h1 { font-family: var(--f-disp); font-size: clamp(2rem, 5vw, 3rem); font-weight: 300; margin-bottom: 2rem; }
        h2 { font-family: var(--f-disp); font-size: 1.5rem; font-weight: 500; margin: 2.5rem 0 1rem; }
        p { font-family: var(--f-disp); font-size: 1.05rem; line-height: 1.9; margin-bottom: 1.2rem; opacity: 0.85; }
        footer { background: #060e18; padding: 2rem 6vw; text-align: center; margin-top: 4rem; }
        .foot-copy { font-size: 0.6rem; color: rgba(255,255,255,0.15); font-family: var(--f-body); }
      `}}/>
      <nav>
        <Link href="/" className="nav-name">{siteName}</Link>
        <Link href="/" className="nav-back">← Αρχική</Link>
      </nav>
      <div className="wrap">
        <h1>Πολιτική Απορρήτου</h1>
        <p>Τελευταία ενημέρωση: {new Date().toLocaleDateString('el-GR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        <h2>1. Συλλογή Δεδομένων</h2>
        <p>Η επιχείρηση {siteName} συλλέγει μόνο τα δεδομένα που είναι απαραίτητα για την παροχή των υπηρεσιών μας, όπως στοιχεία κράτησης που παρέχετε οικειοθελώς.</p>
        <h2>2. Χρήση Δεδομένων</h2>
        <p>Τα δεδομένα σας χρησιμοποιούνται αποκλειστικά για την επιβεβαίωση κρατήσεων. Δεν τα μοιραζόμαστε με τρίτους.</p>
        <h2>3. Cookies</h2>
        <p>Ο ιστότοπός μας χρησιμοποιεί cookies για τη βελτίωση της εμπειρίας περιήγησης.</p>
        <h2>4. Επικοινωνία</h2>
        <p>Για οποιοδήποτε θέμα σχετικά με τα προσωπικά σας δεδομένα, επικοινωνήστε μαζί μας απευθείας.</p>
      </div>
      <footer><span className="foot-copy">© {new Date().getFullYear()} {siteName}</span></footer>
    </>
  )
}
