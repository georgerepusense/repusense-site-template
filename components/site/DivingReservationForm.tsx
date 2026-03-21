'use client'
import { useState } from 'react'

interface Props {
  clientId: string
  clientSlug: string
  phone?: string
}

export default function DivingReservationForm({ clientId, clientSlug, phone }: Props) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    date: '', time: '', course: '', notes: '', party_size: '1'
  })
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [focused, setFocused] = useState<string|null>(null)

  const times = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00']

  const fieldStyle = (key: string): any => ({
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focused === key ? '#0891b2' : 'rgba(224,247,250,0.12)'}`,
    padding: '0.8rem 0',
    fontSize: '0.95rem',
    color: '#f0f8ff',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 300,
    outline: 'none',
    transition: 'border-color 0.3s',
    appearance: 'none' as const,
    borderRadius: 0,
    colorScheme: 'dark',
  })

  const labelStyle: any = {
    display: 'block',
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.52rem',
    letterSpacing: '0.4em',
    textTransform: 'uppercase' as const,
    color: 'rgba(224,247,250,0.35)',
    marginBottom: '0.5rem',
  }

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.date) {
      setErrorMsg('Συμπληρώστε τα υποχρεωτικά πεδία.')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, client_id: clientId, party_size: parseInt(form.party_size) })
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Κάτι πήγε στραβά. Δοκιμάστε ξανά.')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ padding: '2rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ width: 52, height: 52, border: '1px solid rgba(8,145,178,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0891b2', fontSize: '1.4rem' }}>✓</div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: '#f0f8ff', lineHeight: 1 }}>Κράτηση Επιβεβαιώθηκε!</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(224,247,250,0.4)', marginTop: '0.4rem', textTransform: 'uppercase' }}>Θα επικοινωνήσουμε σύντομα</div>
          </div>
        </div>
        <div style={{ height: 1, background: 'rgba(224,247,250,0.08)', marginBottom: '1.5rem' }}/>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.1em', color: 'rgba(224,247,250,0.4)' }}>
          {form.name} · {form.date} {form.time && `· ${form.time}`} {form.course && `· ${form.course}`}
        </div>
        {phone && (
          <a href={`tel:${phone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginTop: '1.5rem', color: '#0891b2', fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textDecoration: 'none', textTransform: 'uppercase' }}>
            <span style={{ width: 20, height: 1, background: '#0891b2', display: 'inline-block' }}/>
            {phone}
          </a>
        )}
      </div>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .drf-input::placeholder { color: rgba(224,247,250,0.2); }
        .drf-select option { background: #0a1628; color: #f0f8ff; }
        .drf-btn { position: relative; overflow: hidden; }
        .drf-btn::after { content: ''; position: absolute; inset: 0; background: #0891b2; transform: translateX(-101%); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); z-index: 0; }
        .drf-btn:hover::after { transform: translateX(0); }
        .drf-btn-text { position: relative; z-index: 1; transition: color 0.4s; }
        .drf-btn:hover .drf-btn-text { color: #060d1a; }
        @media(max-width:600px){ .drf-grid { grid-template-columns: 1fr !important; } }
      `}}/>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#0891b2', marginBottom: '0.5rem' }}>
          01 — Στοιχεία
        </div>
        <div style={{ height: 1, background: 'rgba(8,145,178,0.2)' }}/>
      </div>

      <div className="drf-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 3rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <label htmlFor="drf-name" style={labelStyle}>Όνομα *</label>
          <input id="drf-name" className="drf-input" type="text" placeholder="Το όνομά σας"
            value={form.name} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={fieldStyle('name')}/>
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <label htmlFor="drf-phone" style={labelStyle}>Τηλέφωνο *</label>
          <input id="drf-phone" className="drf-input" type="tel" placeholder="69XXXXXXXX"
            value={form.phone} onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
            onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} style={fieldStyle('phone')}/>
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <label htmlFor="drf-email" style={labelStyle}>Email</label>
          <input id="drf-email" className="drf-input" type="email" placeholder="email@example.com"
            value={form.email} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))} style={fieldStyle('email')}/>
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <label htmlFor="drf-date" style={labelStyle}>Ημερομηνία *</label>
          <input id="drf-date" className="drf-input" type="date"
            min={new Date().toISOString().split('T')[0]}
            value={form.date} onFocus={() => setFocused('date')} onBlur={() => setFocused(null)}
            onChange={e => setForm(p => ({ ...p, date: e.target.value }))} style={fieldStyle('date')}/>
        </div>
      </div>

      <div style={{ marginBottom: '2rem', marginTop: '0.5rem' }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#0891b2', marginBottom: '0.5rem' }}>
          02 — Κατάδυση
        </div>
        <div style={{ height: 1, background: 'rgba(8,145,178,0.2)', marginBottom: '2rem' }}/>
        <div className="drf-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 3rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="drf-time" style={labelStyle}>Ώρα</label>
            <select id="drf-time" className="drf-input drf-select"
              value={form.time} onFocus={() => setFocused('time')} onBlur={() => setFocused(null)}
              onChange={e => setForm(p => ({ ...p, time: e.target.value }))} style={fieldStyle('time')}>
              <option value="">Επιλέξτε ώρα</option>
              {times.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="drf-course" style={labelStyle}>Course / Δραστηριότητα</label>
            <input id="drf-course" className="drf-input" type="text" placeholder="π.χ. Open Water, Fun Dive"
              value={form.course} onFocus={() => setFocused('course')} onBlur={() => setFocused(null)}
              onChange={e => setForm(p => ({ ...p, course: e.target.value }))} style={fieldStyle('course')}/>
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="drf-size" style={labelStyle}>Άτομα</label>
            <select id="drf-size" className="drf-input drf-select"
              value={form.party_size} onFocus={() => setFocused('size')} onBlur={() => setFocused(null)}
              onChange={e => setForm(p => ({ ...p, party_size: e.target.value }))} style={fieldStyle('size')}>
              {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n===1?'άτομο':'άτομα'}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="drf-notes" style={labelStyle}>Σημειώσεις</label>
            <input id="drf-notes" className="drf-input" type="text" placeholder="Εμπειρία, εξοπλισμός..."
              value={form.notes} onFocus={() => setFocused('notes')} onBlur={() => setFocused(null)}
              onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} style={fieldStyle('notes')}/>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#ef4444', flexShrink: 0 }}/>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: '#ef4444', letterSpacing: '0.05em' }}>{errorMsg}</span>
        </div>
      )}

      <button className="drf-btn" onClick={handleSubmit} disabled={status === 'loading'}
        style={{ width: '100%', padding: '1.2rem 2rem', background: 'transparent', border: '1px solid rgba(8,145,178,0.4)', color: '#f0f8ff', fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.35em', textTransform: 'uppercase', cursor: status === 'loading' ? 'not-allowed' : 'pointer', opacity: status === 'loading' ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="drf-btn-text">{status === 'loading' ? 'Αποστολή...' : 'Κλείσε Κατάδυση'}</span>
        <span className="drf-btn-text" style={{ fontSize: '1.1rem' }}>→</span>
      </button>

      {phone && (
        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ height: 1, flex: 1, background: 'rgba(224,247,250,0.06)' }}/>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(224,247,250,0.2)', textTransform: 'uppercase' }}>ή καλέστε</span>
          <div style={{ height: 1, flex: 1, background: 'rgba(224,247,250,0.06)' }}/>
        </div>
      )}
      {phone && (
        <a href={`tel:${phone}`} style={{ display: 'block', textAlign: 'center', marginTop: '1rem', fontFamily: "'DM Mono', monospace", fontSize: '0.8rem', letterSpacing: '0.15em', color: 'rgba(224,247,250,0.4)', transition: 'color 0.3s' }}>
          {phone}
        </a>
      )}
    </div>
  )
}
