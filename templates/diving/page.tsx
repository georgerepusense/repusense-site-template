// DIVING TEMPLATE v2 — Full CMS2 Support
import DivingAnimations from '@/components/site/DivingAnimations'
import DivingReservationForm from '@/components/site/DivingReservationForm'
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

export default async function DivingTemplate({ client }: { client: any }) {
  const params = { clientId: client.id }
  const gbp = client.gbp_data || {}
  const cms = client.site_settings || {}

  // ── CMS2 sections ──
  const sections = client.cms_sections || []
  const heroSection     = sections.find((s: any) => s.type === 'hero')?.settings || {}
  const aboutSection    = sections.find((s: any) => s.type === 'about')?.settings || {}
  const coursesSection  = sections.find((s: any) => s.type === 'courses')?.settings || {}
  const gallerySection  = sections.find((s: any) => s.type === 'gallery')?.settings || {}
  const bookingSection  = sections.find((s: any) => s.type === 'booking')?.settings || {}
  const infoSection     = sections.find((s: any) => s.type === 'info')?.settings || {}

  // ── Base data ──
  const photos      = (gbp.photos || []).filter((p: any) => p?.url)
  const reviews     = (gbp.reviews || []).filter((r: any) => r?.text).slice(0, 6)
  const articles    = client.articles || []
  const todayHours  = getTodayHours(gbp.hours)
  const rating      = gbp.rating || null
  const reviewCount = gbp.review_count || 0

  // ── Hero ──
  const heroPhoto         = heroSection.photo || cms.hero_photo || photos[0]?.url || null
  const heroVideo         = heroSection.video || cms.hero_video || null
  const heroImagePosition = heroSection.image_position || cms.hero_image_position || 'center'
  const brandColor        = heroSection.brand_color || cms.brand_color || '#0891b2'
  const siteName          = heroSection.title || cms.hero_title || client.name
  const heroEyebrow       = heroSection.eyebrow || cms.hero_eyebrow || gbp.category || 'Diving Center'
  const heroDesc          = heroSection.desc || cms.hero_desc || 'Ανακάλυψε τον υποβρύχιο κόσμο με πιστοποιημένους εκπαιδευτές. PADI & SSI courses για όλα τα επίπεδα.'
  const heroLine1         = heroSection.h1_line1 || cms.hero_h1_line1 || 'Κατάδυση'
  const heroLine2         = heroSection.h1_line2 || cms.hero_h1_line2 || siteName

  // ── Contact ──
  const address   = infoSection.address   || cms.address   || gbp.address || ''
  const phone     = infoSection.phone     || cms.phone     || gbp.phone   || ''
  const instagram = infoSection.instagram_url || cms.instagram_url || ''
  const facebook  = infoSection.facebook_url  || cms.facebook_url  || ''
  const whatsapp  = infoSection.whatsapp  || cms.whatsapp  || phone.replace(/\D/g, '')
  const city      = address.split(',')[0]?.trim() || ''

  // ── About ──
  const philosophy = {
    title: aboutSection.title   || cms.philosophy_title  || 'Ανακάλυψε τον\nΚόσμο κάτω\nαπό την\nΕπιφάνεια.',
    text:  aboutSection.text    || cms.philosophy_text   || 'Η θάλασσα κρύβει έναν ολόκληρο κόσμο που λίγοι έχουν δει. Με πιστοποιημένους εκπαιδευτές και σύγχρονο εξοπλισμό, σε οδηγούμε με ασφάλεια στα βάθη της.',
    photo: aboutSection.photo_1 || cms.philosophy_photo_1 || photos[1]?.url || null,
  }

  // ── Courses ──
  const courses = [1,2,3,4,5,6].map(i => ({
    name:     coursesSection[`name_${i}`]     || cms[`course_name_${i}`],
    level:    coursesSection[`level_${i}`]    || cms[`course_level_${i}`],
    duration: coursesSection[`duration_${i}`] || cms[`course_duration_${i}`],
    price:    coursesSection[`price_${i}`]    || cms[`course_price_${i}`],
    desc:     coursesSection[`desc_${i}`]     || cms[`course_desc_${i}`],
  })).filter(c => c.name)

  // ── Gallery ──
  const galleryPhotos = [1,2,3,4,5,6,7,8,9]
    .map(i => gallerySection[`photo_${i}`] || cms[`gallery_photo_${i}`])
    .filter(Boolean)
  const displayGallery  = galleryPhotos.length > 0 ? galleryPhotos : photos.slice(0, 9).map((p: any) => p.url)
  const galleryTitle    = gallerySection.title    || cms.gallery_title    || 'Κάτω από'
  const galleryTitleEm  = gallerySection.title_em || cms.gallery_title_em || 'την Επιφάνεια'

  // ── Booking ──
  const ctaTitle = bookingSection.cta_title || cms.cta_title || 'Κλείσε\nΤη\nΚατάδυσή\nσου'
  const feature1 = bookingSection.feature_1 || cms.feature_1 || 'PADI & SSI πιστοποιημένοι εκπαιδευτές'
  const feature2 = bookingSection.feature_2 || cms.feature_2 || 'Μαθήματα για όλα τα επίπεδα'
  const feature3 = bookingSection.feature_3 || cms.feature_3 || 'Εξοπλισμός παρέχεται'

  // ── Stats ──
  const stats = [
    { num: cms.stat_1_num || '500+', label: cms.stat_1_label || 'Εκπαιδευμένοι Δύτες' },
    { num: cms.stat_2_num || '15+',  label: cms.stat_2_label || 'Χρόνια Εμπειρίας' },
    { num: cms.stat_3_num || '20+',  label: cms.stat_3_label || 'Dive Sites' },
    { num: cms.stat_4_num || '98%',  label: cms.stat_4_label || 'Ικανοποίηση' },
  ]

  return (
    <>
      {heroPhoto && !heroVideo && (
        <link rel="preload" as="image" href={heroPhoto} fetchPriority="high"/>
      )}
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Outfit:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet"/>

      <style dangerouslySetInnerHTML={{ __html: `
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --navy:#060d1a;
          --navy2:#0a1628;
          --navy3:#0f2040;
          --teal:${brandColor};
          --teal-dim:rgba(8,145,178,0.15);
          --foam:#e0f7fa;
          --white:#f0f8ff;
          --muted:rgba(224,247,250,0.45);
          --line:rgba(224,247,250,0.08);
          --f-disp:'Syne',sans-serif;
          --f-body:'Outfit',sans-serif;
          --f-mono:'DM Mono',monospace;
        }
        html{scroll-behavior:smooth;cursor:none}
        body{font-family:var(--f-body);background:var(--navy);color:var(--white);overflow-x:hidden;-webkit-font-smoothing:antialiased}
        ::selection{background:var(--teal);color:var(--navy)}
        img{display:block;max-width:100%;height:auto}
        a{text-decoration:none;color:inherit}

        .cur{position:fixed;pointer-events:none;z-index:9999}
        .cur-dot{width:8px;height:8px;background:var(--teal);border-radius:50%;transform:translate(-50%,-50%);position:absolute;transition:transform 0.15s}
        .cur-ring{width:32px;height:32px;border:1px solid rgba(8,145,178,0.5);border-radius:50%;transform:translate(-50%,-50%);position:absolute;transition:left 0.12s ease,top 0.12s ease}
        @media(hover:none){.cur{display:none}html{cursor:auto}}

        .bubbles{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:2}
        .bubble{position:absolute;bottom:-20px;border-radius:50%;background:rgba(8,145,178,0.15);border:1px solid rgba(8,145,178,0.3);animation:rise linear infinite}
        @keyframes rise{0%{transform:translateY(0) scale(1);opacity:0.6}100%{transform:translateY(-110vh) scale(0.3);opacity:0}}

        .nav{position:fixed;top:0;left:0;right:0;z-index:500;display:flex;align-items:center;justify-content:space-between;padding:2rem 5vw;transition:all 0.5s}
        .nav.stuck{padding:1.2rem 5vw;background:rgba(6,13,26,0.95);backdrop-filter:blur(24px);border-bottom:1px solid var(--line)}
        .nav-brand{display:flex;flex-direction:column;gap:2px}
        .nav-brand-name{font-family:var(--f-disp);font-size:1.3rem;font-weight:800;letter-spacing:0.05em;color:var(--white);line-height:1}
        .nav-brand-tag{font-family:var(--f-mono);font-size:0.5rem;letter-spacing:0.4em;text-transform:uppercase;color:var(--teal)}
        .nav-links{display:flex;align-items:center;gap:2.5rem}
        .nav-a{font-family:var(--f-mono);font-size:0.58rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--muted);transition:color 0.3s}
        .nav-a:hover{color:var(--white)}
        .nav-cta{padding:0.65rem 1.5rem;background:var(--teal);color:var(--navy);font-family:var(--f-mono);font-size:0.58rem;letter-spacing:0.25em;text-transform:uppercase;font-weight:500;border-radius:2px;transition:all 0.3s;position:relative;overflow:hidden}
        .nav-cta::after{content:'';position:absolute;inset:0;background:rgba(255,255,255,0.15);transform:translateX(-101%);transition:transform 0.3s}
        .nav-cta:hover::after{transform:translateX(0)}
        .nav-burger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:4px;z-index:510}
        .nav-burger span{display:block;width:22px;height:1px;background:var(--white);transition:all 0.3s}
        .nav-burger.on span:nth-child(1){transform:translateY(6px) rotate(45deg)}
        .nav-burger.on span:nth-child(2){opacity:0}
        .nav-burger.on span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
        .mob-menu{display:flex;position:fixed;inset:0;z-index:490;background:var(--navy);flex-direction:column;align-items:flex-start;justify-content:center;padding:0 10vw;gap:2rem;opacity:0;pointer-events:none;transition:opacity 0.4s}
        .mob-menu.on{opacity:1;pointer-events:all}
        .mob-menu a{font-family:var(--f-disp);font-size:clamp(2rem,8vw,4rem);font-weight:700;color:var(--white);transition:color 0.3s}
        .mob-menu a:hover{color:var(--teal)}
        .mob-line{width:100%;height:1px;background:var(--line)}

        .hero{height:100svh;min-height:600px;position:relative;overflow:hidden;display:flex;align-items:flex-end}
        .hero-bg{position:absolute;inset:0}
        .hero-bg img,.hero-bg video{width:100%;height:100%;object-fit:cover;object-position:${heroImagePosition}}
        .hero-gradient{position:absolute;inset:0;background:linear-gradient(to top,rgba(6,13,26,1) 0%,rgba(6,13,26,0.5) 40%,rgba(6,13,26,0.2) 100%)}
        .hero-gradient2{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 60%,rgba(8,145,178,0.12) 0%,transparent 60%)}
        .hero-content{position:relative;z-index:3;padding:0 5vw 8vh;width:100%}
        .hero-eyebrow{font-family:var(--f-mono);font-size:0.6rem;letter-spacing:0.5em;text-transform:uppercase;color:var(--teal);margin-bottom:1.5rem;display:flex;align-items:center;gap:1rem;opacity:0;animation:fu 0.8s 0.4s ease forwards}
        .hero-eyebrow-line{width:40px;height:1px;background:var(--teal)}
        .hero-h1{font-family:var(--f-disp);font-size:clamp(3.5rem,8vw,9rem);font-weight:800;line-height:0.92;letter-spacing:-0.01em;color:var(--white);margin-bottom:2rem;opacity:0;animation:fu 0.9s 0.6s cubic-bezier(0.16,1,0.3,1) forwards}
        .hero-h1 span{color:var(--teal)}
        .hero-bottom{display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:2rem;opacity:0;animation:fu 0.8s 1s ease forwards}
        .hero-desc{font-size:0.95rem;font-weight:300;color:var(--muted);max-width:380px;line-height:1.7}
        .hero-meta{display:flex;flex-direction:column;align-items:flex-end;gap:0.8rem}
        .hero-rating-box{display:flex;align-items:center;gap:0.8rem;background:rgba(8,145,178,0.12);border:1px solid rgba(8,145,178,0.25);padding:0.8rem 1.2rem;backdrop-filter:blur(12px)}
        .hero-rating-num{font-family:var(--f-disp);font-size:2rem;font-weight:800;color:var(--teal);line-height:1}
        .hero-rating-stars{color:var(--teal);font-size:0.7rem;letter-spacing:0.1em}
        .hero-rating-count{font-family:var(--f-mono);font-size:0.5rem;letter-spacing:0.2em;color:var(--muted);text-transform:uppercase}
        .hero-scroll{display:flex;align-items:center;gap:0.8rem;opacity:0;animation:fu 0.8s 1.3s ease forwards}
        .hero-scroll span{font-family:var(--f-mono);font-size:0.5rem;letter-spacing:0.35em;text-transform:uppercase;color:var(--muted)}
        .hero-scroll-bar{width:1px;height:50px;background:linear-gradient(to bottom,var(--teal),transparent);animation:pulse 2s ease-in-out infinite}

        .depth{position:absolute;right:5vw;top:50%;transform:translateY(-50%);z-index:3;display:flex;flex-direction:column;align-items:center;gap:0.5rem;opacity:0;animation:fu 1s 1.2s ease forwards}
        .depth-line{width:1px;height:120px;background:linear-gradient(to bottom,transparent,var(--teal),transparent);position:relative}
        .depth-num{font-family:var(--f-mono);font-size:0.55rem;letter-spacing:0.2em;color:var(--teal);writing-mode:vertical-rl}
        .depth-label{font-family:var(--f-mono);font-size:0.45rem;letter-spacing:0.3em;color:var(--muted);text-transform:uppercase;writing-mode:vertical-rl}

        .ticker{background:var(--teal);overflow:hidden;padding:0.65rem 0}
        .ticker-track{display:flex;white-space:nowrap;animation:tick 25s linear infinite}
        .ticker-item{font-family:var(--f-disp);font-size:0.9rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--navy);padding:0 3rem;opacity:0.85}
        .ticker-dot{opacity:0.4;margin:0 0.5rem}

        .stats{background:var(--navy2);display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
        .stat{padding:3rem 2rem;border-right:1px solid var(--line);position:relative;overflow:hidden;transition:background 0.4s}
        .stat:last-child{border-right:none}
        .stat::before{content:'';position:absolute;inset:0;background:var(--teal-dim);transform:scaleY(0);transform-origin:bottom;transition:transform 0.5s cubic-bezier(0.16,1,0.3,1)}
        .stat:hover::before{transform:scaleY(1)}
        .stat-num{font-family:var(--f-disp);font-size:clamp(2.5rem,4vw,4rem);font-weight:800;color:var(--teal);line-height:1;position:relative}
        .stat-label{font-family:var(--f-mono);font-size:0.58rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--muted);margin-top:0.8rem;position:relative}

        .s{padding:8rem 5vw}
        .eyebrow{font-family:var(--f-mono);font-size:0.58rem;letter-spacing:0.45em;text-transform:uppercase;color:var(--teal);display:flex;align-items:center;gap:0.8rem;margin-bottom:1.2rem}
        .eyebrow::before{content:'';display:block;width:20px;height:1px;background:var(--teal)}
        .h2{font-family:var(--f-disp);font-size:clamp(2.5rem,5vw,5.5rem);font-weight:800;line-height:0.92;letter-spacing:-0.01em;color:var(--white)}
        .h2 em{font-style:normal;color:var(--teal)}

        .rv{opacity:0;transform:translateY(40px);transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1)}
        .rv.in{opacity:1;transform:none}
        .rv-l{opacity:0;transform:translateX(-40px);transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1)}
        .rv-l.in{opacity:1;transform:none}
        .rv-r{opacity:0;transform:translateX(40px);transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1)}
        .rv-r.in{opacity:1;transform:none}
        .rv-d1{transition-delay:0.1s}.rv-d2{transition-delay:0.2s}.rv-d3{transition-delay:0.3s}.rv-d4{transition-delay:0.4s}

        .about{background:var(--navy);display:grid;grid-template-columns:1fr 1fr;min-height:80vh}
        .about-media{position:relative;overflow:hidden}
        .about-img{width:100%;height:100%;object-fit:cover;filter:saturate(0.8)}
        .about-img-placeholder{width:100%;height:100%;min-height:500px;background:var(--navy3);display:flex;align-items:center;justify-content:center}
        .about-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(8,145,178,0.2) 0%,transparent 60%)}
        .about-content{padding:7rem 5vw;display:flex;flex-direction:column;justify-content:center;border-left:1px solid var(--line)}
        .about-body{font-size:1rem;line-height:1.9;color:var(--muted);margin-top:1.8rem;font-weight:300}
        .about-stats-row{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-top:3rem;padding-top:3rem;border-top:1px solid var(--line)}
        .about-stat-num{font-family:var(--f-disp);font-size:2.5rem;font-weight:800;color:var(--teal);line-height:1}
        .about-stat-label{font-family:var(--f-mono);font-size:0.55rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--muted);margin-top:0.4rem}

        .courses{background:var(--navy2)}
        .courses-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);margin-top:4rem}
        .course-card{background:var(--navy2);padding:2.5rem;position:relative;overflow:hidden;transition:background 0.4s;cursor:pointer}
        .course-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--teal);transform:scaleX(0);transition:transform 0.4s cubic-bezier(0.16,1,0.3,1)}
        .course-card:hover{background:var(--navy3)}
        .course-card:hover::before{transform:scaleX(1)}
        .course-num{font-family:var(--f-mono);font-size:0.55rem;letter-spacing:0.3em;color:rgba(8,145,178,0.4);margin-bottom:1.5rem}
        .course-level{display:inline-flex;align-items:center;gap:0.5rem;padding:0.3rem 0.8rem;border:1px solid var(--teal);font-family:var(--f-mono);font-size:0.5rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--teal);margin-bottom:1rem}
        .course-name{font-family:var(--f-disp);font-size:1.6rem;font-weight:700;color:var(--white);line-height:1.1;margin-bottom:1rem}
        .course-desc{font-size:0.85rem;color:var(--muted);line-height:1.7;font-weight:300;margin-bottom:2rem}
        .course-meta{display:flex;justify-content:space-between;align-items:center;padding-top:1.5rem;border-top:1px solid var(--line)}
        .course-duration{font-family:var(--f-mono);font-size:0.58rem;letter-spacing:0.2em;color:var(--muted);text-transform:uppercase}
        .course-price{font-family:var(--f-disp);font-size:1.4rem;font-weight:700;color:var(--teal)}

        .gal{background:var(--navy);padding:8rem 0}
        .gal-head{padding:0 5vw;margin-bottom:3rem;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem}
        .gal-grid{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:auto;gap:3px;padding:0 5vw}
        .gal-item{overflow:hidden;position:relative}
        .gal-item:nth-child(1){grid-column:span 2}
        .gal-img{width:100%;aspect-ratio:4/3;object-fit:cover;filter:saturate(0.7);transition:transform 0.7s cubic-bezier(0.16,1,0.3,1),filter 0.5s}
        .gal-item:nth-child(1) .gal-img{aspect-ratio:16/9}
        .gal-item:hover .gal-img{transform:scale(1.05);filter:saturate(1)}
        .gal-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,145,178,0.3) 0%,transparent 50%);opacity:0;transition:opacity 0.4s}
        .gal-item:hover .gal-overlay{opacity:1}

        .revs{background:var(--navy2)}
        .revs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);margin-top:4rem}
        .rev{background:var(--navy2);padding:2.5rem;position:relative;overflow:hidden}
        .rev::before{content:'"';position:absolute;top:1rem;right:1.5rem;font-family:var(--f-disp);font-size:5rem;line-height:1;color:var(--teal);opacity:0.08;pointer-events:none}
        .rev-stars{color:var(--teal);font-size:0.75rem;letter-spacing:0.15em;margin-bottom:1rem}
        .rev-text{font-size:0.9rem;line-height:1.85;color:rgba(240,248,255,0.75);font-style:italic;margin-bottom:2rem;font-weight:300}
        .rev-author{font-family:var(--f-mono);font-size:0.58rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--teal)}

        .book{background:var(--navy);display:grid;grid-template-columns:1fr 1fr;min-height:80vh;position:relative;overflow:hidden}
        .book::before{content:'';position:absolute;top:-20%;left:-10%;width:60%;height:140%;background:radial-gradient(ellipse,rgba(8,145,178,0.08) 0%,transparent 70%);pointer-events:none}
        .book-left{padding:7rem 5vw;display:flex;flex-direction:column;justify-content:center;position:relative;z-index:1}
        .book-title{font-family:var(--f-disp);font-size:clamp(3rem,5vw,5rem);font-weight:800;line-height:0.92;color:var(--white);letter-spacing:-0.01em}
        .book-title em{font-style:normal;color:var(--teal)}
        .book-sub{font-family:var(--f-mono);font-size:0.6rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--muted);margin-top:1.5rem}
        .book-features{margin-top:3rem;display:flex;flex-direction:column;gap:1.2rem}
        .book-feature{display:flex;align-items:center;gap:1rem}
        .book-feature-icon{width:36px;height:36px;border:1px solid var(--teal-dim);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .book-feature-text{font-size:0.85rem;color:var(--muted);font-weight:300}
        .book-right{padding:7rem 5vw;display:flex;flex-direction:column;justify-content:center;border-left:1px solid var(--line);position:relative;z-index:1}

        .blog-card{display:block;background:var(--navy2);transition:background 0.3s}
        .blog-card:hover{background:var(--navy3)}

        .foot{background:#020810;padding:5rem 5vw 3rem;border-top:1px solid var(--line)}
        .foot-top{display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:4rem;padding-bottom:4rem;border-bottom:1px solid var(--line)}
        .foot-brand{font-family:var(--f-disp);font-size:1.8rem;font-weight:800;color:var(--white)}
        .foot-tagline{font-family:var(--f-mono);font-size:0.55rem;letter-spacing:0.25em;color:var(--muted);margin-top:0.6rem;text-transform:uppercase}
        .foot-desc{font-size:0.85rem;color:var(--muted);line-height:1.7;margin-top:1.5rem;font-weight:300;max-width:300px}
        .foot-col-title{font-family:var(--f-mono);font-size:0.55rem;letter-spacing:0.4em;text-transform:uppercase;color:var(--teal);margin-bottom:1.5rem}
        .foot-col-links{display:flex;flex-direction:column;gap:0.8rem}
        .foot-col-link{font-size:0.85rem;color:var(--muted);transition:color 0.3s}
        .foot-col-link:hover{color:var(--white)}
        .foot-social{display:flex;gap:0.8rem;margin-top:1.5rem}
        .foot-soc{width:38px;height:38px;border:1px solid var(--line);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--muted);transition:all 0.3s}
        .foot-soc:hover{border-color:var(--teal);color:var(--teal)}
        .foot-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:2.5rem;flex-wrap:wrap;gap:1rem}
        .foot-copy{font-family:var(--f-mono);font-size:0.55rem;letter-spacing:0.1em;color:rgba(240,248,255,0.2)}
        .foot-legal{display:flex;gap:2rem}
        .foot-legal a{font-family:var(--f-mono);font-size:0.52rem;color:rgba(240,248,255,0.2);transition:color 0.3s}
        .foot-legal a:hover{color:var(--muted)}

        .wa{position:fixed;bottom:2rem;right:2rem;z-index:300;width:52px;height:52px;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(37,211,102,0.3);transition:transform 0.3s}
        .wa:hover{transform:scale(1.08)}
        .wa svg{width:24px;height:24px;fill:white}

        @keyframes fu{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}

        @media(max-width:900px){
          html{cursor:auto}
          .cur{display:none}
          .rv,.rv-l,.rv-r{opacity:1;transform:none;transition:none}
          .nav-links{display:none}
          .nav-burger{display:flex}
          .mob-menu{display:flex}
          .hero-h1{font-size:clamp(2.8rem,10vw,4.5rem)}
          .depth{display:none}
          .hero-bottom{flex-direction:column;align-items:flex-start}
          .hero-meta{align-items:flex-start}
          .stats{grid-template-columns:1fr 1fr}
          .stat:nth-child(2){border-right:none}
          .stat{border-bottom:1px solid var(--line)}
          .about{grid-template-columns:1fr}
          .about-media{height:60vw;min-height:300px}
          .about-img{position:absolute;inset:0;width:100%;height:100%}
          .about-img-placeholder{min-height:300px}
          .about-content{border-left:none;border-top:1px solid var(--line);padding:4rem 5vw}
          .courses-grid{grid-template-columns:1fr}
          .gal{padding:4rem 0}
          .gal-grid{grid-template-columns:1fr 1fr;padding:0 4vw}
          .gal-item:nth-child(1){grid-column:span 2}
          .revs-grid{grid-template-columns:1fr}
          .book{grid-template-columns:1fr}
          .book-left{padding:4rem 5vw;min-height:auto}
          .book-right{padding:4rem 5vw;border-left:none;border-top:1px solid var(--line)}
          .foot-top{grid-template-columns:1fr;gap:2rem}
          .foot-bottom{flex-direction:column;align-items:flex-start}
          .s{padding:5rem 5vw}
        }
        @media(max-width:480px){
          .h2{font-size:2.2rem}
          .hero-h1{font-size:2.8rem}
          .stats{grid-template-columns:1fr 1fr}
          .gal-grid{grid-template-columns:1fr}
          .gal-item:nth-child(1){grid-column:span 1}
        }
      `}}/>

      <DivingAnimations />

      <div className="cur" id="d-cur">
        <div className="cur-dot" id="d-dot"/>
        <div className="cur-ring" id="d-ring"/>
      </div>

      <div className="mob-menu" id="d-mob">
        <div className="mob-line"/>
        <a href="#about">Σχετικά</a>
        <div className="mob-line"/>
        {courses.length > 0 && <a href="#courses">Μαθήματα</a>}
        {courses.length > 0 && <div className="mob-line"/>}
        {displayGallery.length > 0 && <a href="#gallery">Gallery</a>}
        {displayGallery.length > 0 && <div className="mob-line"/>}
        <a href="#booking">Κράτηση</a>
        <div className="mob-line"/>
      </div>

      <nav className="nav" id="d-nav">
        <div className="nav-brand">
          <span className="nav-brand-name">{siteName}</span>
          <span className="nav-brand-tag">{heroEyebrow}</span>
        </div>
        <div className="nav-links">
          <a href="#about" className="nav-a">Σχετικά</a>
          {courses.length > 0 && <a href="#courses" className="nav-a">Μαθήματα</a>}
          {displayGallery.length > 0 && <a href="#gallery" className="nav-a">Gallery</a>}
          <a href="#booking" className="nav-cta">Κράτηση</a>
        </div>
        <button className="nav-burger" id="d-burger" aria-label="Menu">
          <span/><span/><span/>
        </button>
      </nav>

      <section className="hero" aria-label="Hero">
        <div className="hero-bg">
          {heroVideo ? (
            <video autoPlay muted loop playsInline>
              <source src={heroVideo} type="video/mp4"/>
              {heroPhoto && <img src={heroPhoto} alt={siteName} fetchPriority="high"/>}
            </video>
          ) : heroPhoto ? (
            <img src={heroPhoto} alt={`${siteName} - ${heroEyebrow} - ${address}`} fetchPriority="high" decoding="async" style={{objectPosition:heroImagePosition}}/>
          ) : (
            <div style={{width:'100%',height:'100%',background:'linear-gradient(135deg,var(--navy) 0%,var(--navy3) 100%)'}}/>
          )}
        </div>
        <div className="hero-gradient"/>
        <div className="hero-gradient2"/>
        <div className="bubbles" id="d-bubbles"/>
        <div className="depth">
          <div className="depth-num">40m</div>
          <div className="depth-line" id="d-depth"/>
          <div className="depth-label">depth</div>
        </div>
        <div className="hero-content">
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-line"/>
            {heroEyebrow}
          </div>
          <h1 className="hero-h1">
            {heroLine1.split('').map((char: string, i: number) => (
              <span key={i} style={{display:'inline-block'}}>{char === ' ' ? '\u00A0' : char}</span>
            ))}
            <br/>
            <span style={{color:'var(--teal)'}}>
              {heroLine2.split('').map((char: string, i: number) => (
                <span key={i} style={{display:'inline-block'}}>{char === ' ' ? '\u00A0' : char}</span>
              ))}
            </span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-desc">{heroDesc}</p>
            <div className="hero-meta">
              {rating && (
                <div className="hero-rating-box">
                  <div className="hero-rating-num">{rating}</div>
                  <div>
                    <div className="hero-rating-stars">{'★'.repeat(Math.floor(Number(rating)))}</div>
                    <div className="hero-rating-count">{reviewCount} reviews</div>
                  </div>
                </div>
              )}
              <div className="hero-scroll">
                <div className="hero-scroll-bar"/>
                <span>Scroll</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="ticker">
        <div className="ticker-track">
          {[...Array(8)].map((_,i) => (
            <span key={i} className="ticker-item">
              {siteName.toUpperCase()}
              <span className="ticker-dot"> · </span>
              DIVING CENTER
              <span className="ticker-dot"> · </span>
              PADI & SSI CERTIFIED
              <span className="ticker-dot"> · </span>
              {address || 'GREECE'}
              <span className="ticker-dot"> · </span>
            </span>
          ))}
        </div>
      </div>

      <div className="stats">
        {stats.map((s, i) => (
          <div key={i} className="stat rv">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <section className="about" id="about" aria-label="Σχετικά με εμάς">
        <div className="about-media rv-l" style={{position:'relative'}}>
          {philosophy.photo ? (
            <>
              <img src={philosophy.photo} alt={`${siteName} - Diving Center ${city}`} className="about-img" loading="lazy" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}/>
              <div className="about-overlay"/>
            </>
          ) : (
            <div className="about-img-placeholder">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="rgba(8,145,178,0.2)" strokeWidth="1">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </div>
          )}
        </div>
        <div className="about-content rv-r rv-d1">
          <div className="eyebrow">Ποιοι Είμαστε</div>
          <h2 className="h2">
            {philosophy.title.split('\n').map((line: string, i: number) => (
              <span key={i} style={{display:'block',color:i===1?'var(--teal)':'var(--white)'}}>{line}</span>
            ))}
          </h2>
          <p className="about-body">{philosophy.text}</p>
          {rating && (
            <div className="about-stats-row">
              <div>
                <div className="about-stat-num">{rating}★</div>
                <div className="about-stat-label">Google Rating</div>
              </div>
              <div>
                <div className="about-stat-num">{reviewCount}+</div>
                <div className="about-stat-label">Reviews</div>
              </div>
            </div>
          )}
          {address && (
            <div style={{marginTop:'2rem',paddingTop:'2rem',borderTop:'1px solid var(--line)',display:'flex',alignItems:'center',gap:'1rem'}}>
              <div style={{width:32,height:32,border:'1px solid var(--teal-dim)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
              </div>
              <span style={{fontFamily:'var(--f-mono)',fontSize:'0.68rem',letterSpacing:'0.1em',color:'var(--muted)'}}>{address}</span>
            </div>
          )}
        </div>
      </section>

      {courses.length > 0 && (
        <section className="courses s" id="courses" aria-label="Μαθήματα κατάδυσης">
          <div className="rv">
            <div className="eyebrow">Μαθήματα</div>
            <h2 className="h2">Διάλεξε το <em>Course</em> σου</h2>
          </div>
          <div className="courses-grid">
            {courses.map((c, i) => (
              <div key={i} className={`course-card rv rv-d${Math.min(i+1,4)}`}>
                <div className="course-num">0{i+1}</div>
                {c.level && <div className="course-level">◈ {c.level}</div>}
                <div className="course-name">{c.name}</div>
                {c.desc && <p className="course-desc">{c.desc}</p>}
                <div className="course-meta">
                  {c.duration && <span className="course-duration">{c.duration}</span>}
                  {c.price && <span className="course-price">{c.price}</span>}
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
            <span style={{fontFamily:'var(--f-mono)',fontSize:'0.55rem',letterSpacing:'0.3em',color:'var(--muted)',textTransform:'uppercase',alignSelf:'flex-end'}}>
              {displayGallery.length} photos
            </span>
          </div>
          <div className="gal-grid rv rv-d1">
            {displayGallery.slice(0, 6).map((url: string, i: number) => (
              <div key={i} className="gal-item">
                <img src={url} alt={`${siteName} - Κατάδυση ${city} - φωτογραφία ${i+1}`} className="gal-img" loading="lazy"/>
                <div className="gal-overlay"/>
              </div>
            ))}
          </div>
        </section>
      )}

      {reviews.length > 0 && (
        <section className="revs s" id="reviews" aria-label="Κριτικές πελατών">
          <div className="rv">
            <div className="eyebrow">Κριτικές</div>
            <h2 className="h2">Τι Λένε <em>οι Δύτες</em></h2>
          </div>
          <div className="revs-grid">
            {reviews.map((r: any, i: number) => (
              <div key={i} className={`rev rv rv-d${Math.min(i+1,4)}`}>
                <div className="rev-stars">{'★'.repeat(Math.min(r.rating||5,5))}</div>
                <p className="rev-text">"{r.text.slice(0,200)}{r.text.length>200?'…':''}"</p>
                <div className="rev-author">— {r.author}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {articles.length > 0 && (
        <section className="s" style={{background:'var(--navy2)'}} id="blog" aria-label="Blog">
          <div className="rv">
            <div className="eyebrow">Άρθρα & Νέα</div>
            <h2 className="h2">Τα Νέα <em>μας</em></h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:'var(--line)',marginTop:'3rem'}}>
            {articles.map((a:any,i:number) => (
              <a key={a.id} href={`/blog/${a.id}`} className={`blog-card rv rv-d${Math.min(i+1,3)}`}>
                {a.featured_image_url && (
                  <img src={a.featured_image_url} alt={a.title} loading="lazy"
                    style={{width:'100%',aspectRatio:'16/9',objectFit:'cover',filter:'saturate(0.7)',display:'block'}}/>
                )}
                <div style={{padding:'1.5rem 2rem'}}>
                  <div style={{fontFamily:'var(--f-mono)',fontSize:'0.52rem',letterSpacing:'0.3em',color:'var(--muted)',textTransform:'uppercase',marginBottom:'0.8rem'}}>
                    {new Date(a.created_at).toLocaleDateString('el-GR',{day:'numeric',month:'long',year:'numeric'})}
                  </div>
                  <div style={{fontFamily:'var(--f-disp)',fontSize:'1.2rem',fontWeight:700,color:'var(--white)',lineHeight:1.2}}>
                    {a.title}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="book" id="booking" aria-label="Κράτηση κατάδυσης">
        <div className="book-left rv-l">
          <h2 className="book-title">
            {ctaTitle.split('\n').map((l:string,i:number) => (
              <span key={i} style={{display:'block',color:i===1?'var(--teal)':'var(--white)'}}>{l}</span>
            ))}
          </h2>
          <p className="book-sub">{todayHours || 'Καθημερινά'}</p>
          <div className="book-features">
            {[
              { icon:'🤿', text: feature1 },
              { icon:'🎓', text: feature2 },
              { icon:'⚓', text: feature3 },
            ].map((f, i) => (
              <div key={i} className="book-feature">
                <div className="book-feature-icon">
                  <span style={{fontSize:'0.9rem'}}>{f.icon}</span>
                </div>
                <span className="book-feature-text">{f.text}</span>
              </div>
            ))}
          </div>
          {phone && (
            <a href={`tel:${phone}`} style={{marginTop:'2.5rem',display:'flex',alignItems:'center',gap:'1rem',fontFamily:'var(--f-mono)',fontSize:'0.7rem',letterSpacing:'0.15em',color:'var(--teal)'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              {phone}
            </a>
          )}
        </div>
        <div className="book-right rv-r rv-d1">
          <DivingReservationForm clientId={client.id} clientSlug={params.clientId} phone={phone}/>
        </div>
      </section>

      <footer className="foot">
        <div className="foot-top">
          <div>
            <div className="foot-brand">{siteName}</div>
            <div className="foot-tagline">{heroEyebrow}</div>
            <p className="foot-desc">{philosophy.text.slice(0, 120)}…</p>
            <div className="foot-social">
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="foot-soc" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              )}
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" className="foot-soc" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
            </div>
          </div>
          <div>
            <div className="foot-col-title">Navigation</div>
            <div className="foot-col-links">
              <a href="#about" className="foot-col-link">Σχετικά</a>
              {courses.length > 0 && <a href="#courses" className="foot-col-link">Μαθήματα</a>}
              {displayGallery.length > 0 && <a href="#gallery" className="foot-col-link">Gallery</a>}
              {reviews.length > 0 && <a href="#reviews" className="foot-col-link">Κριτικές</a>}
              <a href="#booking" className="foot-col-link">Κράτηση</a>
            </div>
          </div>
          <div>
            <div className="foot-col-title">Επικοινωνία</div>
            <div className="foot-col-links">
              {phone && <a href={`tel:${phone}`} className="foot-col-link">{phone}</a>}
              {address && <span className="foot-col-link" style={{cursor:'default'}}>{address}</span>}
              {todayHours && <span className="foot-col-link" style={{cursor:'default',color:'var(--teal)'}}>{todayHours}</span>}
            </div>
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
