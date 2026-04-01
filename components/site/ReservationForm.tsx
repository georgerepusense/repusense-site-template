'use client'
import { useState } from 'react'

const CSS = `
  .res-form { width: 100%; }
  .res-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .res-field { display: flex; flex-direction: column; gap: 6px; }
  .res-field-full { grid-column: span 2; }
  .res-label { font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.5); font-weight: 300; }
  .res-input { min-height: 48px; padding: 12px 16px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: white; font-size: 0.95rem; border-radius: 4px; width: 100%; font-family: inherit; }
  .res-input:focus { outline: none; border-color: rgba(255,255,255,0.4); }
  .res-textarea { min-height: 100px; resize: vertical; }
  .res-submit { margin-top: 24px; padding: 1rem 3rem; background: transparent; border: 1px solid rgba(255,255,255,0.4); color: white; font-size: 0.75rem; letter-spacing: 0.3em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; font-family: inherit; }
  .res-submit:hover { background: white; color: #0b1a2e; }
  .res-error { color: #ff6b6b; font-size: 0.85rem; margin-top: 8px; }
  .res-success { text-align: center; padding: 2rem; }
  .res-success-icon { font-size: 2rem; margin-bottom: 1rem; color: #10b981; }
  .res-success-title { font-size: 1.5rem; color: white; margin-bottom: 0.5rem; }
  .res-success-text { color: rgba(255,255,255,0.6); margin-bottom: 1.5rem; }
  .res-call-btn { color: white; border-bottom: 1px solid rgba(255,255,255,0.3); text-decoration: none; }
  @media (max-width: 600px) { .res-grid { grid-template-columns: 1fr; } .res-field-full { grid-column: span 1; } }
`

interface Props {
  clientId: string
  clientSlug: string
  phone?: string
}

export default function ReservationForm({ clientId, clientSlug, phone }: Props) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    date: '', time: '', party_size: '2', notes: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const times = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ]

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.date || !form.time) {
      setErrorMsg('Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία.')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://repusense.vercel.app'
      const apiKey = process.env.NEXT_PUBLIC_REPUSENSE_API_KEY || ''
      const res = await fetch(`${apiUrl}/api/reservations`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({ 
          ...form, 
          client_id: clientId, 
          party_size: parseInt(form.party_size) 
        })
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Κάτι πήγε στραβά. Δοκιμάστε ξανά ή καλέστε μας.')
    }
  }

  if (status === 'success') {
  return (
    <div style={{ textAlign:'center', padding:'3rem 1rem' }}>
      <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>✓</div>
      <h3 style={{ fontFamily:'var(--f-disp)', fontSize:'2rem', fontWeight:300, color:'white', marginBottom:'0.75rem', letterSpacing:'0.05em' }}>
        Η κράτησή σας καταχωρήθηκε!
      </h3>
      <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1rem', fontFamily:'var(--f-disp)', fontStyle:'italic', marginBottom:'1.5rem', lineHeight:1.7 }}>
        Θα επιβεβαιώσουμε την κράτησή σας άμεσα.<br/>Σας περιμένουμε!
      </p>
      {phone && (
        <a href={`tel:${phone}`} style={{ color:'var(--gold)', borderBottom:'1px solid rgba(201,169,110,0.4)', textDecoration:'none', fontSize:'0.85rem', letterSpacing:'0.1em' }}>
          Ή καλέστε μας: {phone}
        </a>
      )}
    </div>
  )
}

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }}/>
      <div className="res-form">
        <div className="res-grid">
          <div className="res-field">
            <label htmlFor="res-name" className="res-label">Όνομα *</label>
<input id="res-name" className="res-input" type="text" placeholder="Το όνομά σας"
              value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}/>
          </div>
          <div className="res-field">
            <label htmlFor="res-phone" className="res-label">Τηλέφωνο *</label>
<input id="res-phone" className="res-input" type="tel" placeholder="69XXXXXXXX"
              value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}/>
          </div>
          <div className="res-field">
            <label htmlFor="res-email" className="res-label">Email</label>
<input id="res-email" className="res-input" type="email" placeholder="email@example.com"
              value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}/>
          </div>
          <div className="res-field">
            <label htmlFor="res-party" className="res-label">Άτομα *</label>
<select id="res-party" className="res-input" value={form.party_size}
              onChange={e => setForm(f => ({ ...f, party_size: e.target.value }))}>
              {[1,2,3,4,5,6,7,8,10,12].map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'άτομο' : 'άτομα'}</option>
              ))}
            </select>
          </div>
          <div className="res-field">
            <label htmlFor="res-date" className="res-label">Ημερομηνία *</label>
<input id="res-date" className="res-input" type="date"
              min={new Date().toISOString().split('T')[0]}
              value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}/>
          </div>
          <div className="res-field">
            <label htmlFor="res-time" className="res-label">Ώρα *</label>
<select id="res-time" className="res-input" value={form.time}
              onChange={e => setForm(f => ({ ...f, time: e.target.value }))}>
              <option value="">Επιλέξτε ώρα</option>
              {times.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="res-field res-field-full">
            <label htmlFor="res-notes" className="res-label">Σημειώσεις</label>
<textarea id="res-notes" className="res-input res-textarea" placeholder="Αλλεργίες, ειδικές απαιτήσεις..."
              value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}/>
          </div>
        </div>
        {errorMsg && <p className="res-error">{errorMsg}</p>}
        <button className="res-submit" onClick={handleSubmit} disabled={status === 'loading'}>
          {status === 'loading' ? 'Αποστολή...' : 'Αίτηση Κράτησης'}
        </button>
      </div>
    </>
  )
}
