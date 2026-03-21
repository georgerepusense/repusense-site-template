'use client'
import { useEffect } from 'react'

export default function BarberAnimations() {
  useEffect(() => {
    // Nav scroll
    const nav = document.getElementById('b-nav')
    const handleScroll = () => {
      if (nav) nav.className = window.scrollY > 60 ? 'nav stuck' : 'nav'
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Burger menu
    const btn = document.getElementById('b-burger')
    const mob = document.getElementById('b-mob')
    if (btn && mob) {
      const toggle = () => {
        const isOpen = mob.classList.toggle('on')
        btn.classList.toggle('on')
        document.body.style.overflow = isOpen ? 'hidden' : ''
      }
      btn.addEventListener('click', toggle)
      mob.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          mob.classList.remove('on')
          btn.classList.remove('on')
          document.body.style.overflow = ''
        })
      })
    }

    // Cursor
    const dot = document.getElementById('b-dot')
    if (dot && window.matchMedia('(hover:hover)').matches) {
      document.addEventListener('mousemove', e => {
        dot.style.left = e.clientX + 'px'
        dot.style.top = e.clientY + 'px'
      })
    }

    // Rev
    // eal
    const els = document.querySelectorAll('.rv,.rv-l,.rv-r')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { threshold: 0.05 })
    els.forEach(el => io.observe(el))

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return null
}
