'use client'
import { useState } from 'react'

interface Props {
  clientId: string
  clientSlug: string
  phone?: string
}

export default function BarberReservationForm({ clientId, clientSlug, phone }: Props) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    date: '', time: '', party_size: '1', notes: ''
  })
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [focused, setFocused] = useState<string|null>(null)

  const times = [
    '09:00','09:30','10:00','10:30','11:00','11:30',
    '12:00','12:30','13:00','13:30','14:00','14:30',
    '15:00','15:30','16:00','16:30','17:00','17:30',
    '18:00','18:30','19:00','19:30'
  ]

  const fieldStyle = (key: string): any => ({
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focused === key ? 'var(--gold, #c8b89a)' : 'rgba(245,242,238,0.15)'}`,
    padding: '0.8rem 0',
    fontSize: '1rem',
    color: '#f5f2ee',
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 300,
    outline: 'none',
    transition: 'border-color 0.3s',
    appearance: 'none' as const,
    WebkitAppearance: 'none' as const,
    background2: 'transparent',
    borderRadius: 0,
  })

  const labelStyle: any = {
    display: 'block',
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.55rem',
    letterSpacing: '0.4em',
    textTransform: 'uppercase' as const,
    color: 'rgba(245,242,238,0.35)',
    marginBottom: '0.6rem',
  }

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.date || !form.time) {
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
      <div style={{ padding: '3rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ width: 48, height: 48, border: '1px solid rgba(200,184,154,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Mono', monospace", fontSize: '1.2rem', color: '#c8b89a' }}>✓</div>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '0.1em', color: '#f5f2ee', lineHeight: 1 }}>Ραντεβού Καταχωρήθηκε</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(245,242,238,0.4)', marginTop: '0.4rem', textTransform: 'uppercase' }}>Θα επικοινωνήσουμε σύντομα</div>
          </div>
        </div>
        <div style={{ height: '1px', background: 'rgba(245,242,238,0.08)', marginBottom: '2rem' }}/>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.1em', color: 'rgba(245,242,238,0.4)' }}>
          {form.name} · {form.date} · {form.time}
        </div>
        {phone && (
          <a href={`tel:${phone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginTop: '1.5rem', color: '#c8b89a', fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textDecoration: 'none', textTransform: 'uppercase' }}>
            <span style={{ width: 20, height: 1, background: '#c8b89a', display: 'inline-block' }}/>
            {phone}
          </a>
        )}
      </div>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .brf-input::placeholder { color: rgba(245,242,238,0.2); }
        .brf-input:focus { border-bottom-color: #c8b89a !important; }
        .brf-select option { background: #141414; color: #f5f2ee; }
        .brf-btn { position: relative; overflow: hidden; }
        .brf-btn::after { content: ''; position: absolute; inset: 0; background: var(--gold, #c8b89a); transform: translateX(-101%); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); z-index: 0; }
        .brf-btn:hover::after { transform: translateX(0); }
        .brf-btn span { position: relative; z-index: 1; transition: color 0.4s; }
        .brf-btn:hover span { color: #080808; }
        @media(max-width:600px){
          .brf-grid { grid-template-columns: 1fr !important; }
        }
      `}}/>

      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
        {['Στοιχεία', 'Ημερομηνία', 'Επιβεβαίωση'].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: 24, height: 24,
              border: `1px solid ${i === 0 ? 'rgba(200,184,154,0.6)' : 'rgba(245,242,238,0.1)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'DM Mono', monospace", fontSize: '0.55rem',
              color: i === 0 ? '#c8b89a' : 'rgba(245,242,238,0.2)'
            }}>0{i+1}</div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: i === 0 ? 'rgba(245,242,238,0.5)' : 'rgba(245,242,238,0.15)' }}>{s}</span>
            {i < 2 && <div style={{ width: 20, height: 1, background: 'rgba(245,242,238,0.08)' }}/>}
          </div>
        ))}
      </div>

      {/* Fields */}
      <div className="brf-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0 2rem' }}>

        {/* Όνομα */}
        <div style={{ marginBottom: '2rem' }}>
          <label htmlFor="brf-name" style={labelStyle}>Όνομα *</label>
          <input id="brf-name" className="brf-input" type="text" placeholder="Το όνομά σας"
            value={form.name}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            style={fieldStyle('name')}
          />
        </div>

        {/* Τηλέφωνο */}
        <div style={{ marginBottom: '2rem' }}>
          <label htmlFor="brf-phone" style={labelStyle}>Τηλέφωνο *</label>
          <input id="brf-phone" className="brf-input" type="tel" placeholder="69XXXXXXXX"
            value={form.phone}
            onFocus={() => setFocused('phone')}
            onBlur={() => setFocused(null)}
            onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
            style={fieldStyle('phone')}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: '2rem' }}>
          <label htmlFor="brf-email" style={labelStyle}>Email</label>
          <input id="brf-email" className="brf-input" type="email" placeholder="email@example.com"
            value={form.email}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            style={fieldStyle('email')}
          />
        </div>

        {/* Ημερομηνία */}
        <div style={{ marginBottom: '2rem' }}>
          <label htmlFor="brf-date" style={labelStyle}>Ημερομηνία *</label>
          <input id="brf-date" className="brf-input" type="date"
            min={new Date().toISOString().split('T')[0]}
            value={form.date}
            onFocus={() => setFocused('date')}
            onBlur={() => setFocused(null)}
            onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
            style={{ ...fieldStyle('date'), colorScheme: 'dark' }}
          />
        </div>

        {/* Ώρα */}
        <div style={{ marginBottom: '2rem' }}>
          <label htmlFor="brf-time" style={labelStyle}>Ώρα *</label>
          <select id="brf-time" className="brf-input brf-select"
            value={form.time}
            onFocus={() => setFocused('time')}
            onBlur={() => setFocused(null)}
            onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
            style={{ ...fieldStyle('time'), cursor: 'pointer' }}
          >
            <option value="">Επιλέξτε ώρα</option>
            {times.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Τύπος υπηρεσίας */}
        <div style={{ marginBottom: '2rem' }}>
          <label htmlFor="brf-service" style={labelStyle}>Τύπος Υπηρεσίας</label>
          <input id="brf-service" className="brf-input" type="text" placeholder="Κούρεμα, Ξύρισμα..."
            value={form.notes}
            onFocus={() => setFocused('service')}
            onBlur={() => setFocused(null)}
            onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
            style={fieldStyle('service')}
          />
        </div>

      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(245,242,238,0.06)', margin: '1rem 0 2rem' }}/>

      {/* Error */}
      {errorMsg && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#ef4444', flexShrink: 0 }}/>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.1em', color: '#ef4444' }}>{errorMsg}</span>
        </div>
      )}

      {/* Submit */}
      <button
        className="brf-btn"
        onClick={handleSubmit}
        disabled={status === 'loading'}
        style={{
          width: '100%',
          padding: '1.2rem 2rem',
          background: 'transparent',
          border: '1px solid rgba(200,184,154,0.4)',
          color: '#f5f2ee',
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.65rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.5 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>{status === 'loading' ? 'Αποστολή...' : 'Κράτα Ραντεβού'}</span>
        <span style={{ fontSize: '1.2rem', transition: 'transform 0.3s' }}>→</span>
      </button>

      {phone && (
        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ height: 1, flex: 1, background: 'rgba(245,242,238,0.06)' }}/>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(245,242,238,0.2)', textTransform: 'uppercase' }}>ή καλέστε</span>
          <div style={{ height: 1, flex: 1, background: 'rgba(245,242,238,0.06)' }}/>
        </div>
      )}
      {phone && (
        <a href={`tel:${phone}`} style={{ display: 'block', textAlign: 'center', marginTop: '1rem', fontFamily: "'DM Mono', monospace", fontSize: '0.85rem', letterSpacing: '0.15em', color: 'rgba(245,242,238,0.5)', transition: 'color 0.3s' }}>
          {phone}
        </a>
      )}
    </div>
  )
}

