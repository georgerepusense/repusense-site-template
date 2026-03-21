'use client'
import { useEffect } from 'react'

export default function DivingAnimations() {
  useEffect(() => {
    // Nav scroll
    const nav = document.getElementById('d-nav')
    const handleScroll = () => {
      if (nav) nav.className = window.scrollY > 60 ? 'nav stuck' : 'nav'
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Burger menu
    const btn = document.getElementById('d-burger')
    const mob = document.getElementById('d-mob')
    if (btn && mob) {
      btn.addEventListener('click', () => {
        const isOpen = mob.classList.toggle('on')
        btn.classList.toggle('on')
        document.body.style.overflow = isOpen ? 'hidden' : ''
      })
      mob.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          mob.classList.remove('on')
          btn.classList.remove('on')
          document.body.style.overflow = ''
        })
      })
    }

    // Cursor
    const dot = document.getElementById('d-dot')
    const ring = document.getElementById('d-ring')
    if (dot && ring && window.matchMedia('(hover:hover)').matches) {
      let mx = 0, my = 0, rx = 0, ry = 0
      document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY
        dot.style.left = mx + 'px'
        dot.style.top = my + 'px'
      })
      const animRing = () => {
        rx += (mx - rx) * 0.1
        ry += (my - ry) * 0.1
        ring.style.left = rx + 'px'
        ring.style.top = ry + 'px'
        requestAnimationFrame(animRing)
      }
      animRing()
    }

    // Bubbles
    const container = document.getElementById('d-bubbles')
    if (container) {
      const createBubble = () => {
        const b = document.createElement('div')
        b.className = 'bubble'
        const size = Math.random() * 20 + 8
        b.style.cssText = `
          width:${size}px;height:${size}px;
          left:${Math.random()*100}%;
          animation-duration:${Math.random()*8+6}s;
          animation-delay:${Math.random()*4}s;
        `
        container.appendChild(b)
        setTimeout(() => b.remove(), 14000)
      }
      const interval = setInterval(createBubble, 600)
      // Initial bubbles
      for (let i = 0; i < 8; i++) setTimeout(createBubble, i * 200)
      return () => {
        clearInterval(interval)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    // Reveal
    const els = document.querySelectorAll('.rv,.rv-l,.rv-r')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' })
    els.forEach(el => io.observe(el))

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return null
}
