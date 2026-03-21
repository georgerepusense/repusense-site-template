'use client'
import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (!localStorage.getItem('cookies_accepted')) setShow(true)
  }, [])
  if (!show) return null
  return (
    <div style={{position:'fixed',bottom:'1rem',left:'1rem',right:'1rem',zIndex:1000,background:'rgba(20,20,20,0.95)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,padding:'1rem 1.5rem',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'1rem',flexWrap:'wrap'}}>
      <p style={{fontSize:'0.8rem',color:'rgba(255,255,255,0.6)',margin:0}}>Χρησιμοποιούμε cookies για καλύτερη εμπειρία.</p>
      <button onClick={() => { localStorage.setItem('cookies_accepted','true'); setShow(false) }}
        style={{padding:'0.5rem 1.2rem',background:'white',color:'black',border:'none',borderRadius:4,fontSize:'0.75rem',cursor:'pointer',fontWeight:600,whiteSpace:'nowrap'}}>
        Αποδοχή
      </button>
    </div>
  )
}
