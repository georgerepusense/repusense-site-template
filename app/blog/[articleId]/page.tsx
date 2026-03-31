import { getClientData } from '@/lib/repusense'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

export const revalidate = 3600

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function renderContent(text: string) {
  if (!text) return ''
  return text
    .replace(/^## (.+)$/gm, (_, t) => {
      const id = t.replace(/\*\*/g, '').toLowerCase().replace(/[^a-zα-ω0-9]/gi, '-').replace(/-+/g, '-')
      return `<h2 id="${id}">${t}</h2>`
    })
    .replace(/^### (.+)$/gm, (_, t) => `<h3>${t}</h3>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
}

export default async function ArticlePage({ params }: { params: { articleId: string } }) {
  const client = await getClientData()
  const cms = client.site_settings || {}
  const brandColor = cms.brand_color || '#c9a96e'
  const siteName = cms.hero_title || client.name
  const logo = cms.logo || ''

  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('client_id', client.id)
    .eq('status', 'published')
    .or(`slug.eq.${params.articleId},id.eq.${params.articleId}`)
    .single()

  if (!article) notFound()

  const wordCount = (article.content || '').trim().split(/\s+/).filter(Boolean).length
  const readingTime = Math.ceil(wordCount / 200)
  const publishDate = new Date(article.created_at).toLocaleDateString('el-GR', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  const toc: { text: string, id: string }[] = []
  ;(article.content || '').split('\n').forEach((line: string) => {
    const h2 = line.match(/^## (.+)$/)
    if (h2) {
      const text = h2[1].replace(/\*\*/g, '')
      const id = text.toLowerCase().replace(/[^a-zα-ω0-9]/gi, '-').replace(/-+/g, '-')
      toc.push({ text, id })
    }
  })

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cormorant+SC:wght@300;400;500&family=Jost:wght@200;300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --ink: #0b1a2e; --gold: ${brandColor}; --cream: #fdfaf4; --muted: #8a7e72; --salt: #f4f1eb; --border: rgba(11,26,46,0.08); --f-disp: 'Cormorant Garamond', Georgia, serif; --f-sc: 'Cormorant SC', Georgia, serif; --f-body: 'Jost', sans-serif; }
        html { scroll-behavior: smooth; }
        body { font-family: var(--f-body); font-weight: 300; background: var(--cream); color: var(--ink); }
        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.2rem 6vw; background: rgba(11,26,46,0.97); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(201,169,110,0.15); }
        .nav-brand { text-decoration: none; display: flex; flex-direction: column; }
        .nav-name { font-family: var(--f-sc); font-size: 1rem; letter-spacing: 0.35em; color: white; }
        .nav-sub { font-size: 0.55rem; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold); font-weight: 200; margin-top: 2px; }
        .nav-back { color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; font-family: var(--f-body); }
        .nav-back:hover { color: var(--gold); }
        .article-hero { padding-top: 80px; }
        .hero-img { width: 100%; max-height: 520px; object-fit: cover; display: block; }
        .article-wrap { max-width: 740px; margin: 0 auto; padding: 4rem 6vw 6rem; }
        .article-eyebrow { font-size: 0.6rem; letter-spacing: 0.45em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.2rem; }
        .article-title { font-family: var(--f-disp); font-size: clamp(2rem, 5vw, 3.6rem); font-weight: 400; line-height: 1.08; color: var(--ink); margin-bottom: 1.5rem; }
        .article-meta { display: flex; gap: 1.5rem; flex-wrap: wrap; font-size: 0.72rem; color: var(--muted); margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border); }
        .toc { background: var(--salt); border: 1px solid var(--border); border-left: 3px solid var(--gold); border-radius: 4px; padding: 1.6rem 2rem; margin-bottom: 2.8rem; }
        .toc-title { font-family: var(--f-sc); font-size: 0.75rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--muted); margin-bottom: 1rem; }
        .toc a { display: block; font-family: var(--f-disp); font-size: 1rem; color: var(--ink); text-decoration: none; padding: 0.25rem 0; transition: color 0.2s; }
        .toc a:hover { color: var(--gold); }
        .article-content { font-family: var(--f-disp); font-size: 1.12rem; line-height: 1.9; color: var(--ink); }
        .article-content p { margin-bottom: 1.6rem; }
        .article-content h2 { font-family: var(--f-disp); font-size: 1.9rem; font-weight: 500; margin: 3rem 0 1.2rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem; }
        .article-content h3 { font-family: var(--f-disp); font-size: 1.4rem; font-weight: 500; margin: 2.2rem 0 0.9rem; }
        .article-content strong { font-weight: 600; }
        .article-content em { font-style: italic; color: var(--muted); }
        .article-content li { margin-bottom: 0.5rem; font-family: var(--f-disp); }
        .faq-section { margin-top: 4rem; border-top: 1px solid var(--border); padding-top: 3rem; }
        .faq-title { font-family: var(--f-sc); font-size: 1.3rem; letter-spacing: 0.15em; margin-bottom: 2rem; }
        .faq-item { margin-bottom: 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 1.5rem; }
        .faq-q { font-family: var(--f-disp); font-size: 1.1rem; font-weight: 500; margin-bottom: 0.7rem; }
        .faq-a { font-size: 0.92rem; color: var(--muted); line-height: 1.8; }
        .back-link { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--gold); text-decoration: none; font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase; margin-top: 4rem; border-bottom: 1px solid rgba(201,169,110,0.3); padding-bottom: 2px; }
        footer { background: #060e18; padding: 2.5rem 6vw; text-align: center; margin-top: 4rem; }
        .foot-copy { font-size: 0.6rem; color: rgba(255,255,255,0.15); font-family: var(--f-body); }
        @media (max-width: 768px) { .article-wrap { padding: 3rem 5vw 5rem; } }
      `}}/>

      <nav>
        <Link href="/" className="nav-brand">
          {logo
            ? <img src={logo} alt={siteName} style={{ height:28, objectFit:'contain' }}/>
            : <span className="nav-name">{siteName}</span>
          }
          <span className="nav-sub">{client.business_type}</span>
        </Link>
        <Link href="/" className="nav-back">← Αρχική</Link>
      </nav>

      <div className="article-hero">
        {article.featured_image_url && (
          <img src={article.featured_image_url} alt={article.title} className="hero-img"/>
        )}
      </div>

      <div className="article-wrap">
        <div className="article-eyebrow">Άρθρο · {siteName}</div>
        <h1 className="article-title">{article.title}</h1>
        <div className="article-meta">
          <span>{publishDate}</span>
          <span>·</span>
          <span>{readingTime} λεπτά ανάγνωση</span>
          {article.focus_keyword && <><span>·</span><span style={{ color: brandColor }}>{article.focus_keyword}</span></>}
        </div>

        {article.meta_description && (
          <p style={{ fontFamily:'var(--f-disp)', fontSize:'1.15rem', color:'var(--muted)', lineHeight:1.8, marginBottom:'2.5rem', fontStyle:'italic', borderLeft:`3px solid var(--gold)`, paddingLeft:'1.2rem' }}>
            {article.meta_description}
          </p>
        )}

        {toc.length > 2 && (
          <div className="toc">
            <div className="toc-title">Περιεχόμενα</div>
            {toc.map((h, i) => <a key={i} href={`#${h.id}`}>{h.text}</a>)}
          </div>
        )}

        <div className="article-content"
          dangerouslySetInnerHTML={{ __html: '<p>' + renderContent(article.content || '') + '</p>' }}/>

        {article.faq && article.faq.length > 0 && (
          <div className="faq-section">
            <div className="faq-title">Συχνές Ερωτήσεις</div>
            {article.faq.map((item: any, i: number) => (
              <div key={i} className="faq-item">
                <div className="faq-q">{item.question}</div>
                <div className="faq-a">{item.answer}</div>
              </div>
            ))}
          </div>
        )}

        <Link href="/" className="back-link">← Επιστροφή στην αρχική</Link>
      </div>

      <footer>
        <span className="foot-copy">© {new Date().getFullYear()} {siteName}</span>
      </footer>
    </>
  )
}
