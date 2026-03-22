// BARBER TEMPLATE v3 — Full CMS2 Support
import BarberAnimations from '@/components/site/BarberAnimations'
import BarberReservationForm from '@/components/site/BarberReservationForm'
import CookieBanner from '@/components/site/CookieBanner'

function getTodayHours(hours: any[]) {
  if (!hours?.length) return null
  const days = ['Κυριακή','Δευτέρα','Τρίτη','Τετάρτη','Πέμπτη','Παρασκευή','Σάββατο']
  const today = days[new Date().getDay()]
  const h = hours.find((h: any) => h.day?.startsWith(today.slice(0,3)))
  if (!h) return null
  if (h.closed) return 'Κλειστά σήμερα'
  return `${h.open || ''} — ${h.close || ''}`
}

export default async function BarberTemplate({ client }: { client: any }) {
  const params = { clientId: client.id }
  const gbp = client.gbp_data || {}
  const cms = client.site_settings || {}

  // ── CMS2 sections ──
  const sections = client.cms_sections || []
  const heroSection     = sections.find((s: any) => s.type === 'hero')?.settings || {}
  const aboutSection    = sections.find((s: any) => s.type === 'about')?.settings || {}
  const servicesSection = sections.find((s: any) => s.type === 'services')?.settings || {}
  const gallerySection  = sections.find((s: any) => s.type === 'gallery')?.settings || {}
  const bookingSection  = sections.find((s: any) => s.type === 'booking')?.settings || {}
  const infoSection     = sections.find((s: any) => s.type === 'info')?.settings || {}

  // ── Base data ──
  const photos      = (gbp.photos || []).filter((p: any) => p?.url)
  const reviews     = (gbp.reviews || []).filter((r: any) => r?.text).slice(0, 6)
  const todayHours  = getTodayHours(gbp.hours)
  const rating      = gbp.rating || null
  const reviewCount = gbp.review_count || 0
  const articles = client.articles || []

  // ── Hero ──
  const heroPhoto        = heroSection.photo || cms.hero_photo || photos[0]?.url || null
  const heroVideo        = heroSection.video || cms.hero_video || null
  const heroImagePosition = heroSection.image_position || cms.hero_image_position || 'center'
  const brandColor       = heroSection.brand_color || cms.brand_color || '#c8b89a'
  const siteName         = heroSection.title || cms.hero_title || client.name
  const heroEyebrow      = heroSection.eyebrow || cms.hero_eyebrow || gbp.category || 'Barber Shop'

  // ── Contact ──
  const address   = infoSection.address   || cms.address   || gbp.address || ''
  const phone     = infoSection.phone     || cms.phone     || gbp.phone   || ''
  const instagram = infoSection.instagram_url || cms.instagram_url || ''
  const facebook  = infoSection.facebook_url  || cms.facebook_url  || ''
  const whatsapp  = infoSection.whatsapp  || cms.whatsapp  || phone.replace(/\D/g, '')
  const city      = address.split(',')[0]?.trim() || ''

  // ── About ──
  const philosophy = {
    title:  aboutSection.title   || cms.philosophy_title  || 'Precision.\nCraft.\nIdentity.',
    text:   aboutSection.text    || cms.philosophy_text   || 'Δεν κάνουμε απλώς κουρέματα. Σχεδιάζουμε την εικόνα σου. Κάθε λεπτομέρεια έχει σημασία.',
    photo:  aboutSection.photo_1 || cms.philosophy_photo_1 || photos[1]?.url || null,
    photo2: aboutSection.photo_2 || cms.philosophy_photo_2 || photos[2]?.url || null,
  }

  // ── Services ──
  const services = [1,2,3,4,5,6,7,8].map(i => ({
    name:     servicesSection[`name_${i}`]     || cms[`service_name_${i}`],
    price:    servicesSection[`price_${i}`]    || cms[`service_price_${i}`],
    duration: servicesSection[`duration_${i}`] || cms[`service_duration_${i}`],
  })).filter(s => s.name)

  // ── Gallery ──
  const galleryPhotos = [1,2,3,4,5,6,7,8,9]
    .map(i => gallerySection[`photo_${i}`] || cms[`gallery_photo_${i}`])
    .filter(Boolean)
  const displayGallery = galleryPhotos.length > 0
    ? galleryPhotos
    : photos.slice(0, 9).map((p: any) => p.url)
  const galleryTitle   = gallerySection.title    || cms.gallery_title    || 'Η Δουλειά'
  const galleryTitleEm = gallerySection.title_em || cms.gallery_title_em || 'Μιλά'

  // ── Booking ──
  const ctaTitle = bookingSection.cta_title || cms.cta_title || 'ΚΛΕΙΣΕ\nΡΑΝΤΕΒΟΥ\nΣΗΜΕΡΑ'

  return (
    <>
      {heroPhoto && !heroVideo && (
        <link rel="preload" as="image" href={heroPhoto} fetchPriority="high" />
      )}
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,200;0,9..40,300;0,9..40,400;1,9..40,300&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet"/>

      <style dangerouslySetInnerHTML={{ __html: `
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --black:#080808;
          --white:#f5f2ee;
          --gold:${brandColor};
          --gray:#141414;
          --gray2:#1c1c1c;
          --line:rgba(245,242,238,0.08);
          --f-disp:'Bebas Neue',sans-serif;
          --f-body:'DM Sans',sans-serif;
          --f-mono:'DM Mono',monospace;
        }
        html{scroll-behavior:smooth;cursor:none}
        body{font-family:var(--f-body);background:var(--black);color:var(--white);overflow-x:hidden;-webkit-font-smoothing:antialiased}
        ::selection{background:var(--gold);color:var(--black)}
        img{display:block;max-width:100%;height:auto}
        a{text-decoration:none;color:inherit}

        .cur{position:fixed;pointer-events:none;z-index:9999}
        .cur-dot{width:32px;height:32px;background:none;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;pointer-events:none;position:absolute}
        .cur-ring{display:none;position:absolute}
        @media(hover:none){.cur{display:none}html{cursor:auto}}

        .nav{position:fixed;top:0;left:0;right:0;z-index:500;display:flex;align-items:center;justify-content:space-between;padding:2rem 5vw;transition:padding 0.5s,background 0.5s}
        .nav.stuck{padding:1.2rem 5vw;background:rgba(8,8,8,0.96);backdrop-filter:blur(24px);border-bottom:1px solid var(--line)}
        .nav-brand{font-family:var(--f-disp);font-size:1.5rem;letter-spacing:0.12em;color:var(--white)}
        .nav-links{display:flex;align-items:center;gap:3rem}
        .nav-a{font-family:var(--f-mono);font-size:0.6rem;letter-spacing:0.35em;text-transform:uppercase;color:rgba(245,242,238,0.5);transition:color 0.3s}
        .nav-a:hover{color:var(--white)}
        .nav-book{padding:0.65rem 1.6rem;background:var(--white);color:var(--black);font-family:var(--f-mono);font-size:0.58rem;letter-spacing:0.3em;text-transform:uppercase;transition:background 0.3s,color 0.3s}
        .nav-book:hover{background:var(--gold);color:var(--black)}
        .nav-burger{display:none;flex-direction:column;gap:6px;background:none;border:none;cursor:pointer;padding:4px;z-index:510}
        .nav-burger span{display:block;width:22px;height:1px;background:var(--white);transition:all 0.3s}
        .nav-burger.on span:nth-child(1){transform:translateY(7px) rotate(45deg)}
        .nav-burger.on span:nth-child(2){opacity:0;transform:scaleX(0)}
        .nav-burger.on span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}

        .mob-menu{display:flex;position:fixed;inset:0;z-index:490;background:var(--black);flex-direction:column;align-items:flex-start;justify-content:center;padding:0 10vw;gap:2rem;opacity:0;pointer-events:none;transition:opacity 0.4s}
        .mob-menu.on{opacity:1;pointer-events:all}
        .mob-menu a{font-family:var(--f-disp);font-size:clamp(2.5rem,10vw,5rem);color:var(--white);text-decoration:none;transition:color 0.3s}
        .mob-menu a:hover{color:var(--gold)}
        .mob-line{width:100%;height:1px;background:var(--line)}

        .hero{height:100svh;min-height:600px;display:grid;grid-template-columns:1fr 1fr;position:relative;overflow:hidden}
        .hero-left{position:relative;overflow:hidden}
        .hero-left-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${heroImagePosition};filter:grayscale(30%) contrast(1.1)}
        .hero-left-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(8,8,8,0.7) 0%,rgba(8,8,8,0.3) 100%)}
        .hero-right{background:var(--black);display:flex;flex-direction:column;justify-content:flex-end;padding:0 6vw 8vh 5vw;position:relative;overflow:hidden}
        .hero-right::before{content:'';position:absolute;top:0;left:0;bottom:0;width:1px;background:linear-gradient(to bottom,transparent,var(--gold),transparent)}
        .hero-tag{font-family:var(--f-mono);font-size:0.58rem;letter-spacing:0.45em;text-transform:uppercase;color:var(--gold);margin-bottom:2rem;display:flex;align-items:center;gap:1rem;opacity:0;animation:fu 0.8s 0.6s ease forwards}
        .hero-tag-line{width:32px;height:1px;background:var(--gold)}
        .hero-h1{font-family:var(--f-disp);font-size:clamp(4rem,9vw,9.5rem);line-height:0.88;letter-spacing:0.01em;color:var(--white);opacity:0;animation:fu 0.9s 0.8s cubic-bezier(0.16,1,0.3,1) forwards}
        .hero-meta{margin-top:2rem;display:flex;align-items:center;gap:1.5rem;opacity:0;animation:fu 0.8s 1.1s ease forwards;flex-wrap:wrap}
        .hero-hours-txt{font-family:var(--f-mono);font-size:0.62rem;letter-spacing:0.2em;color:rgba(245,242,238,0.7)}
        .hero-counter{position:absolute;bottom:3rem;right:5vw;font-family:var(--f-disp);font-size:8rem;color:var(--white);opacity:0.04;line-height:1;pointer-events:none}
        .hero-scroll-hint{display:flex;align-items:center;gap:1rem;opacity:0;animation:fu 0.8s 1.4s ease forwards;margin-top:2rem}
        .hero-scroll-hint span{font-family:var(--f-mono);font-size:0.55rem;letter-spacing:0.35em;text-transform:uppercase;color:rgba(245,242,238,0.4)}
        .hero-scroll-bar{width:40px;height:1px;background:rgba(245,242,238,0.2);position:relative;overflow:hidden}
        .hero-scroll-bar::after{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:var(--gold);animation:sb 2s ease-in-out infinite}

        .ticker{background:var(--gold);overflow:hidden;padding:0.7rem 0;position:relative;z-index:10}
        .ticker-track{display:flex;white-space:nowrap;animation:tick 18s linear infinite}
        .ticker-item{font-family:var(--f-disp);font-size:1rem;letter-spacing:0.25em;color:var(--black);padding:0 2.5rem;opacity:0.9}
        .ticker-dot{color:var(--black);opacity:0.4}

        .s{padding:7rem 5vw}
        .eyebrow{font-family:var(--f-mono);font-size:0.58rem;letter-spacing:0.45em;text-transform:uppercase;color:var(--gold);display:flex;align-items:center;gap:0.8rem;margin-bottom:1.2rem}
        .eyebrow::before{content:'';display:block;width:20px;height:1px;background:var(--gold)}
        .h2{font-family:var(--f-disp);font-size:clamp(2.8rem,5.5vw,6rem);line-height:0.9;letter-spacing:0.02em;color:var(--white)}
        .h2 em{font-style:normal;color:var(--gold)}

        .rv{opacity:0;transform:translateY(48px);transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1)}
        .rv.in{opacity:1;transform:none}
        .rv-l{opacity:0;transform:translateX(-40px);transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1)}
        .rv-l.in{opacity:1;transform:none}
        .rv-r{opacity:0;transform:translateX(40px);transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1)}
        .rv-r.in{opacity:1;transform:none}
        .rv-d1{transition-delay:0.1s}.rv-d2{transition-delay:0.2s}.rv-d3{transition-delay:0.3s}.rv-d4{transition-delay:0.4s}

        .about{background:var(--black);display:grid;grid-template-columns:1fr 1fr;min-height:80vh}
        .about-media{position:relative;overflow:hidden}
        .about-media-inner{position:absolute;inset:0;display:grid;grid-template-rows:1fr 1fr;gap:2px}
        .about-img{width:100%;height:100%;object-fit:cover;filter:grayscale(20%);transition:filter 0.6s}
        .about-img:hover{filter:grayscale(0%)}
        .about-img-placeholder{width:100%;height:100%;background:var(--gray2);display:flex;align-items:center;justify-content:center}
        .about-content{padding:6rem 5vw;display:flex;flex-direction:column;justify-content:center;border-left:1px solid var(--line)}
        .about-body{font-size:1rem;line-height:1.9;color:rgba(245,242,238,0.75);margin-top:1.8rem;font-weight:300}
        .about-num-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-top:3rem;padding-top:3rem;border-top:1px solid var(--line)}
        .about-num{font-family:var(--f-disp);font-size:3rem;color:var(--gold);line-height:1}
        .about-num-label{font-family:var(--f-mono);font-size:0.58rem;letter-spacing:0.3em;text-transform:uppercase;color:rgba(245,242,238,0.4);margin-top:0.4rem}

        .svs{background:var(--gray)}
        .svs-head{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:4rem;gap:2rem;flex-wrap:wrap}
        .svs-list{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--line)}
        .sv{padding:2rem 2.5rem;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--line);border-right:1px solid var(--line);position:relative;overflow:hidden;transition:background 0.4s}
        .sv:nth-child(even){border-right:none}
        .sv::after{content:'';position:absolute;bottom:0;left:0;right:0;height:0;background:rgba(200,184,154,0.06);transition:height 0.4s cubic-bezier(0.16,1,0.3,1)}
        .sv:hover::after{height:100%}
        .sv:hover .sv-arrow{opacity:1;transform:translateX(0)}
        .sv-left{display:flex;align-items:center;gap:1.5rem}
        .sv-num{font-family:var(--f-mono);font-size:0.6rem;color:rgba(245,242,238,0.2);letter-spacing:0.1em;width:2rem}
        .sv-name{font-family:var(--f-disp);font-size:1.5rem;letter-spacing:0.05em;color:var(--white)}
        .sv-right{display:flex;align-items:center;gap:2rem;position:relative;z-index:1}
        .sv-dur{font-family:var(--f-mono);font-size:0.6rem;letter-spacing:0.2em;color:rgba(245,242,238,0.35);text-transform:uppercase}
        .sv-price{font-family:var(--f-mono);font-size:1rem;color:var(--gold);min-width:60px;text-align:right}
        .sv-arrow{font-size:1rem;color:var(--gold);opacity:0;transform:translateX(-8px);transition:all 0.3s}

        .gal{background:var(--black);padding:7rem 0}
        .gal-head{padding:0 5vw;margin-bottom:3rem;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem}
        .gal-grid{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:auto auto;gap:3px;padding:0 5vw}
        .gal-item{overflow:hidden;position:relative}
        .gal-item:nth-child(1){grid-row:span 2}
        .gal-item:nth-child(1) .gal-img{aspect-ratio:unset;height:100%}
        .gal-img{width:100%;aspect-ratio:4/5;object-fit:cover;filter:grayscale(30%) contrast(1.05);transition:transform 0.7s cubic-bezier(0.16,1,0.3,1),filter 0.5s}
        .gal-item:hover .gal-img{transform:scale(1.06);filter:grayscale(0%)}

        .revs{background:var(--gray)}
        .revs-head{margin-bottom:4rem}
        .revs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line)}
        .rev{background:var(--gray);padding:2.5rem;position:relative}
        .rev::before{content:'"';position:absolute;top:1.5rem;right:2rem;font-family:var(--f-disp);font-size:6rem;line-height:1;color:var(--gold);opacity:0.08;pointer-events:none}
        .rev-stars{color:var(--gold);font-size:0.8rem;letter-spacing:0.15em;margin-bottom:1.2rem}
        .rev-text{font-size:0.9rem;line-height:1.85;color:rgba(245,242,238,0.8);font-style:italic;margin-bottom:2rem;font-weight:300}
        .rev-author{font-family:var(--f-mono);font-size:0.6rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--gold)}

        .book{background:var(--black);display:grid;grid-template-columns:1fr 1fr;min-height:80vh}
        .book-left{background:var(--gold);display:flex;flex-direction:column;justify-content:center;padding:5rem 5vw;position:relative;overflow:hidden}
        .book-left::before{content:'BOOK';position:absolute;bottom:-2rem;left:-1rem;font-family:var(--f-disp);font-size:12rem;color:rgba(8,8,8,0.12);line-height:1;pointer-events:none;white-space:nowrap}
        .book-title{font-family:var(--f-disp);font-size:clamp(3rem,5vw,5.5rem);line-height:0.9;color:var(--black);letter-spacing:0.02em}
        .book-sub{font-family:var(--f-mono);font-size:0.65rem;letter-spacing:0.3em;text-transform:uppercase;color:rgba(8,8,8,0.6);margin-top:1.5rem}
        .book-info{margin-top:3rem;display:flex;flex-direction:column;gap:1rem}
        .book-info-item{display:flex;align-items:center;gap:1rem;font-family:var(--f-mono);font-size:0.7rem;letter-spacing:0.1em;color:rgba(8,8,8,0.7)}
        .book-right{padding:5rem 5vw;display:flex;flex-direction:column;justify-content:center;border-left:1px solid var(--line)}

        .foot{background:#040404;padding:4rem 5vw 2.5rem;border-top:1px solid var(--line)}
        .foot-top{display:grid;grid-template-columns:1fr 1fr 1fr;gap:3rem;padding-bottom:3rem;border-bottom:1px solid var(--line)}
        .foot-brand{font-family:var(--f-disp);font-size:2rem;letter-spacing:0.12em;color:var(--white)}
        .foot-tagline{font-family:var(--f-mono);font-size:0.58rem;letter-spacing:0.2em;color:rgba(245,242,238,0.3);margin-top:0.8rem;text-transform:uppercase}
        .foot-col-title{font-family:var(--f-mono);font-size:0.55rem;letter-spacing:0.4em;text-transform:uppercase;color:var(--gold);margin-bottom:1.5rem}
        .foot-col-links{display:flex;flex-direction:column;gap:0.8rem}
        .foot-col-link{font-size:0.85rem;color:rgba(245,242,238,0.45);transition:color 0.3s}
        .foot-col-link:hover{color:var(--white)}
        .foot-social-row{display:flex;gap:0.8rem;margin-top:1rem}
        .foot-soc{width:40px;height:40px;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;color:rgba(245,242,238,0.4);transition:all 0.3s}
        .foot-soc:hover{border-color:var(--gold);color:var(--gold)}
        .foot-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:2rem;flex-wrap:wrap;gap:1rem}
        .foot-copy{font-family:var(--f-mono);font-size:0.58rem;letter-spacing:0.1em;color:rgba(245,242,238,0.2)}
        .foot-legal{display:flex;gap:2rem}
        .foot-legal a{font-family:var(--f-mono);font-size:0.55rem;color:rgba(245,242,238,0.2);transition:color 0.3s}
        .foot-legal a:hover{color:rgba(245,242,238,0.5)}

        .wa{position:fixed;bottom:2rem;right:2rem;z-index:300;width:52px;height:52px;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(37,211,102,0.3);transition:transform 0.3s}
        .wa:hover{transform:scale(1.08)}
        .wa svg{width:24px;height:24px;fill:white}
        .blog-card{display:block;background:var(--gray);transition:background 0.3s}
        .blog-card:hover{background:var(--gray2)}

        @keyframes fu{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes sb{0%{left:-100%}100%{left:100%}}

        @media(max-width:900px){
          html{cursor:auto}
          .cur{display:none}
          .rv,.rv-l,.rv-r{opacity:1;transform:none;transition:none}
          .nav-links{display:none}
          .nav-burger{display:flex}
          .hero{grid-template-columns:1fr;grid-template-rows:50vh auto;height:auto;min-height:auto}
          .hero-left{height:50vh}
          .hero-right{padding:2.5rem 5vw 4rem}
          .hero-right::before{display:none}
          .hero-counter{display:none}
          .hero-h1{font-size:clamp(3rem,13vw,5rem)}
          .about{grid-template-columns:1fr;min-height:auto}
          .about-media{height:55vw;min-height:250px}
          .about-media-inner{position:absolute;inset:0}
          .about-content{border-left:none;border-top:1px solid var(--line);padding:3rem 5vw}
          .svs-list{grid-template-columns:1fr}
          .sv{border-right:none}
          .sv:nth-child(even){border-right:none}
          .gal{padding:4rem 0}
          .gal-grid{grid-template-columns:1fr 1fr;padding:0 4vw;gap:2px}
          .gal-item:nth-child(1){grid-row:span 1}
          .gal-item:nth-child(1) .gal-img{aspect-ratio:4/5;height:auto}
          .revs-grid{grid-template-columns:1fr;gap:1px}
          .book{grid-template-columns:1fr;min-height:auto}
          .book-left{padding:3rem 5vw;min-height:auto}
          .book-left::before{font-size:6rem}
          .book-right{padding:3rem 5vw;border-left:none;border-top:1px solid var(--line)}
          .foot-top{grid-template-columns:1fr;gap:2rem}
          .foot-bottom{flex-direction:column;align-items:flex-start}
          .s{padding:4rem 5vw}
          .svs-head{margin-bottom:2rem}
          .revs-head{margin-bottom:2rem}
        }
        @media(max-width:480px){
          .h2{font-size:2.5rem}
          .hero-h1{font-size:3rem}
          .gal-grid{grid-template-columns:1fr}
          .ticker-item{font-size:0.85rem;padding:0 1.5rem}
        }
      `}}/>

      <BarberAnimations />

      <div className="cur" id="b-cur">
        <div className="cur-dot" id="b-dot">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c8b89a" strokeWidth="1.2" strokeLinecap="round">
            <circle cx="6" cy="6" r="3"/>
            <circle cx="6" cy="18" r="3"/>
            <line x1="20" y1="4" x2="8.12" y2="15.88"/>
            <line x1="14.47" y1="14.48" x2="20" y2="20"/>
            <line x1="8.12" y1="8.12" x2="12" y2="12"/>
          </svg>
        </div>
        <div className="cur-ring" id="b-ring"/>
      </div>

      <div className="mob-menu" id="b-mob">
        <div className="mob-line"/>
        <a href="#about">Σχετικά</a>
        <div className="mob-line"/>
        {services.length > 0 && <a href="#services">Υπηρεσίες</a>}
        {services.length > 0 && <div className="mob-line"/>}
        {displayGallery.length > 0 && <a href="#gallery">Gallery</a>}
        {displayGallery.length > 0 && <div className="mob-line"/>}
        <a href="#booking">Ραντεβού</a>
        <div className="mob-line"/>
      </div>

      <nav className="nav" id="b-nav">
        <a href="#" className="nav-brand">{siteName}</a>
        <div className="nav-links">
          <a href="#about" className="nav-a">Σχετικά</a>
          {services.length > 0 && <a href="#services" className="nav-a">Υπηρεσίες</a>}
          {displayGallery.length > 0 && <a href="#gallery" className="nav-a">Gallery</a>}
          <a href="#booking" className="nav-book">Ραντεβού</a>
        </div>
        <button className="nav-burger" id="b-burger" aria-label="Menu">
          <span/><span/><span/>
        </button>
      </nav>

      <section className="hero" aria-label="Hero">
        <div className="hero-left">
          {heroVideo ? (
            <video autoPlay muted loop playsInline style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',filter:'grayscale(30%) contrast(1.1)'}}>
              <source src={heroVideo} type="video/mp4"/>
            </video>
          ) : heroPhoto ? (
            <img src={heroPhoto} alt={`${siteName} - ${heroEyebrow} - ${address}`} className="hero-left-img" fetchPriority="high" decoding="async" style={{objectPosition:heroImagePosition}}/>
          ) : (
            <div style={{position:'absolute',inset:0,background:'var(--gray2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <span style={{fontFamily:'var(--f-disp)',fontSize:'8rem',color:'rgba(245,242,238,0.05)'}}>✂</span>
            </div>
          )}
          <div className="hero-left-overlay"/>
          {rating && (
            <div style={{position:'absolute',bottom:'2rem',left:'2rem',zIndex:2,background:'rgba(8,8,8,0.75)',backdropFilter:'blur(12px)',border:'1px solid rgba(200,184,154,0.3)',padding:'1rem 1.5rem',display:'flex',alignItems:'center',gap:'1rem'}}>
              <div style={{fontFamily:'var(--f-disp)',fontSize:'2.5rem',color:brandColor,lineHeight:1}}>{rating}</div>
              <div>
                <div style={{color:brandColor,fontSize:'0.8rem',letterSpacing:'0.1em'}}>{'★'.repeat(Math.floor(Number(rating)))}</div>
                <div style={{fontFamily:'var(--f-mono)',fontSize:'0.55rem',letterSpacing:'0.2em',color:'rgba(245,242,238,0.5)',marginTop:'0.3rem',textTransform:'uppercase'}}>{reviewCount} Reviews</div>
              </div>
            </div>
          )}
        </div>
        <div className="hero-right">
          <div className="hero-tag">
            <div className="hero-tag-line"/>
            {heroEyebrow}
          </div>
          <h1 className="hero-h1">
            {siteName.toUpperCase().split(' ').map((w: string, i: number) => (
              <span key={i} style={{display:'block',color:i===1?brandColor:'var(--white)'}}>{w}</span>
            ))}
          </h1>
          <div className="hero-meta">
            {todayHours && (
              <>
                <div style={{width:6,height:6,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 8px #22c55e',flexShrink:0}}/>
                <span className="hero-hours-txt">{todayHours}</span>
              </>
            )}
          </div>
          <div className="hero-scroll-hint">
            <div className="hero-scroll-bar"/>
            <span>Scroll</span>
          </div>
          <div className="hero-counter">01</div>
        </div>
      </section>

      <div className="ticker">
        <div className="ticker-track">
          {[...Array(10)].map((_,i) => (
            <span key={i} className="ticker-item">
              {siteName.toUpperCase()}
              <span className="ticker-dot"> · </span>
              BARBER SHOP
              <span className="ticker-dot"> · </span>
              PREMIUM GROOMING
              <span className="ticker-dot"> · </span>
            </span>
          ))}
        </div>
      </div>

      <section className="about" id="about" aria-label="Σχετικά με εμάς">
        <div className="about-media rv-l">
          <div className="about-media-inner">
            {philosophy.photo ? (
              <img src={philosophy.photo} alt={`${siteName} - Barber Shop ${city}`} className="about-img" loading="lazy"/>
            ) : (
              <div className="about-img-placeholder">
                <span style={{fontFamily:'var(--f-disp)',fontSize:'6rem',color:'rgba(245,242,238,0.05)'}}>✂</span>
              </div>
            )}
            {philosophy.photo2 && (
              <img src={philosophy.photo2} alt={`${siteName} interior`} className="about-img" loading="lazy"/>
            )}
          </div>
        </div>
        <div className="about-content rv-r rv-d1">
          <div className="eyebrow">Ποιοι Είμαστε</div>
          <h2 className="h2">
            {philosophy.title.split('\n').map((line: string, i: number) => (
              <span key={i} style={{display:'block',color:i===1?brandColor:'var(--white)'}}>{line}</span>
            ))}
          </h2>
          <p className="about-body">{philosophy.text}</p>
          {(rating || reviewCount > 0) && (
            <div className="about-num-grid">
              {rating && (
                <div>
                  <div className="about-num">{rating}<span style={{color:brandColor}}>★</span></div>
                  <div className="about-num-label">Google Rating</div>
                </div>
              )}
              {reviewCount > 0 && (
                <div>
                  <div className="about-num">{reviewCount}<span style={{color:brandColor,fontSize:'2rem'}}>+</span></div>
                  <div className="about-num-label">Αξιολογήσεις</div>
                </div>
              )}
            </div>
          )}
          {address && (
            <div style={{marginTop:'2rem',paddingTop:'2rem',borderTop:'1px solid var(--line)',display:'flex',alignItems:'center',gap:'1rem'}}>
              <div style={{width:32,height:32,border:'1px solid rgba(200,184,154,0.3)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={brandColor} strokeWidth="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
              </div>
              <span style={{fontFamily:'var(--f-mono)',fontSize:'0.7rem',letterSpacing:'0.1em',color:'rgba(245,242,238,0.5)'}}>{address}</span>
            </div>
          )}
        </div>
      </section>

      {services.length > 0 && (
        <section className="svs s" id="services" aria-label="Υπηρεσίες">
          <div className="svs-head rv">
            <div>
              <div className="eyebrow">Υπηρεσίες</div>
              <h2 className="h2">Τι <em>Προσφέρουμε</em></h2>
            </div>
            <a href="#booking" style={{fontFamily:'var(--f-mono)',fontSize:'0.6rem',letterSpacing:'0.3em',textTransform:'uppercase',color:'rgba(245,242,238,0.4)',borderBottom:'1px solid rgba(245,242,238,0.15)',paddingBottom:'0.3rem',transition:'color 0.3s',alignSelf:'flex-end'}}>
              Κράτα Ραντεβού →
            </a>
          </div>
          <div className="svs-list rv rv-d1">
            {services.map((s, i) => (
              <div key={i} className="sv">
                <div className="sv-left">
                  <span className="sv-num">0{i+1}</span>
                  <span className="sv-name">{s.name}</span>
                </div>
                <div className="sv-right">
                  {s.duration && <span className="sv-dur">{s.duration}</span>}
                  {s.price && <span className="sv-price">{s.price}</span>}
                  <span className="sv-arrow">→</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {displayGallery.length > 0 && (
        <section className="gal" id="gallery" aria-label="Gallery φωτογραφιών">
          <div className="gal-head rv">
            <div>
              <div className="eyebrow">Gallery</div>
              <h2 className="h2">{galleryTitle} <em>{galleryTitleEm}</em></h2>
            </div>
            <span style={{fontFamily:'var(--f-mono)',fontSize:'0.6rem',letterSpacing:'0.3em',color:'rgba(245,242,238,0.2)',textTransform:'uppercase',alignSelf:'flex-end'}}>
              {displayGallery.length} photos
            </span>
          </div>
          <div className="gal-grid rv rv-d1">
            {displayGallery.slice(0, 6).map((url: string, i: number) => (
              <div key={i} className="gal-item">
                <img src={url} alt={`${siteName} - ${heroEyebrow} ${city} - φωτογραφία ${i+1}`} className="gal-img" loading="lazy"/>
              </div>
            ))}
          </div>
        </section>
      )}

      {reviews.length > 0 && (
        <section className="revs s" id="reviews" aria-label="Κριτικές πελατών">
          <div className="revs-head rv">
            <div className="eyebrow">Κριτικές</div>
            <h2 className="h2">Τι Λένε <em>οι Πελάτες</em></h2>
          </div>
          <div className="revs-grid">
            {reviews.map((r: any, i: number) => (
              <div key={i} className={`rev rv rv-d${Math.min(i+1,4)}`}>
                <div className="rev-stars">{'★'.repeat(Math.min(r.rating || 5, 5))}</div>
                <p className="rev-text">"{r.text.slice(0, 200)}{r.text.length > 200 ? '…' : ''}"</p>
                <div className="rev-author">— {r.author}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {articles.length > 0 && (
  <section className="s" style={{background:'var(--gray)'}} id="blog">
    <div className="rv">
      <div className="eyebrow">Άρθρα & Νέα</div>
      <h2 className="h2">Τα Νέα <em>μας</em></h2>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:'var(--line)',marginTop:'3rem'}}>
      {articles.map((a:any,i:number) => (
        <a key={a.id} href={`/blog/${a.id}`} className={`blog-card rv rv-d${Math.min(i+1,3)}`}>
          {a.featured_image_url && (
            <img src={a.featured_image_url} alt={a.title} loading="lazy"
              style={{width:'100%',aspectRatio:'16/9',objectFit:'cover',display:'block'}}/>
          )}
          <div style={{padding:'1.5rem 2rem'}}>
            <div style={{fontFamily:'var(--f-mono)',fontSize:'0.52rem',letterSpacing:'0.3em',color:'rgba(245,242,238,0.3)',textTransform:'uppercase',marginBottom:'0.8rem'}}>
              {new Date(a.created_at).toLocaleDateString('el-GR',{day:'numeric',month:'long',year:'numeric'})}
            </div>
            <div style={{fontFamily:'var(--f-disp)',fontSize:'1.2rem',color:'var(--white)',lineHeight:1.2}}>
              {a.title}
            </div>
          </div>
        </a>
      ))}
    </div>
  </section>
)}
      <section className="book" id="booking" aria-label="Κράτηση ραντεβού">
        <div className="book-left rv-l">
          <h2 className="book-title">
            {ctaTitle.split('\n').map((l: string, i: number) => (
              <span key={i} style={{display:'block'}}>{l}</span>
            ))}
          </h2>
          <p className="book-sub">{todayHours || 'Δευτέρα — Σάββατο'}</p>
          <div className="book-info">
            {phone && (
              <a href={`tel:${phone}`} className="book-info-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(8,8,8,0.7)" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                {phone}
              </a>
            )}
            {address && (
              <div className="book-info-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(8,8,8,0.7)" strokeWidth="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
                {address}
              </div>
            )}
          </div>
        </div>
        <div className="book-right rv-r rv-d1">
          <BarberReservationForm clientId={client.id} clientSlug={params.clientId} phone={phone}/>
        </div>
      </section>

      <footer className="foot">
        <div className="foot-top">
          <div>
            <div className="foot-brand">{siteName}</div>
            <div className="foot-tagline">{heroEyebrow}</div>
          </div>
          <div>
            <div className="foot-col-title">Navigation</div>
            <div className="foot-col-links">
              <a href="#about" className="foot-col-link">Σχετικά</a>
              {services.length > 0 && <a href="#services" className="foot-col-link">Υπηρεσίες</a>}
              {displayGallery.length > 0 && <a href="#gallery" className="foot-col-link">Gallery</a>}
              <a href="#booking" className="foot-col-link">Ραντεβού</a>
            </div>
          </div>
          <div>
            <div className="foot-col-title">Social</div>
            <div className="foot-social-row">
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="foot-soc" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              )}
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" className="foot-soc" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
            </div>
            {address && (
              <div style={{marginTop:'1.5rem',fontFamily:'var(--f-mono)',fontSize:'0.62rem',letterSpacing:'0.1em',color:'rgba(245,242,238,0.3)',lineHeight:1.7}}>
                {address}{phone && <><br/>{phone}</>}
              </div>
            )}
          </div>
        </div>
        <div className="foot-bottom">
          <span className="foot-copy">© {new Date().getFullYear()} {siteName}. All rights reserved.</span>
          <div className="foot-legal">
            <a href="/privacy">Πολιτική Απορρήτου</a>
            <a href="/cookies">Cookies</a>
          </div>
        </div>
      </footer>

      {whatsapp && (
        <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="wa" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      )}

      <CookieBanner />
    </>
  )
}