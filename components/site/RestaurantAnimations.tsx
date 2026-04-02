'use client'
import { useEffect } from 'react'

export default function RestaurantAnimations({ cursorEmoji = '🐟' }: { cursorEmoji?: string }) {
  useEffect(() => {
    // ── CURSOR ──────────────────────────────
    if (window.matchMedia('(hover:hover)').matches) {
        document.documentElement.style.cursor = 'none'
document.body.style.cursor = 'none'
      let cursor = document.getElementById('r-cursor')
      if (!cursor) {
        cursor = document.createElement('div')
        cursor.id = 'r-cursor'
        cursor.innerHTML = cursorEmoji
        cursor.style.cssText = 'position:fixed;top:0;left:0;font-size:22px;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:transform 0.15s ease;will-change:left,top;'
        document.body.appendChild(cursor)
      }

      const moveCursor = (e: MouseEvent) => {
        cursor!.style.left = e.clientX + 'px'
        cursor!.style.top = e.clientY + 'px'
      }
      document.addEventListener('mousemove', moveCursor, { passive: true })

      const hoverEls = document.querySelectorAll('a, button, .menu-item, .review-card, .dish-item')
      hoverEls.forEach(el => {
        el.addEventListener('mouseenter', () => { cursor!.style.transform = 'translate(-50%,-50%) scale(1.6)' })
        el.addEventListener('mouseleave', () => { cursor!.style.transform = 'translate(-50%,-50%) scale(1)' })
      })
    }

    // ── HAMBURGER MENU ──────────────────────
    const hamburger = document.getElementById('hamburger')
    const mobileMenu = document.getElementById('mobile-menu')
    const menuClose = document.getElementById('menu-close')

    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'))
      menuClose?.addEventListener('click', () => mobileMenu.classList.remove('open'))
      mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => mobileMenu.classList.remove('open'))
      })
    }

    // ── PARALLAX HERO ───────────────────────
    const heroBg = document.querySelector('.hero-bg') as HTMLElement
    if (heroBg) {
      let ticking = false
      const onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`
            ticking = false
          })
          ticking = true
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    // ── SCROLL REVEAL ───────────────────────
    const revealEls = document.querySelectorAll(
      '.philosophy-inner > *, .reviews-grid > *, .menu-grid > *, .dishes-grid > *, .info-grid > *, .review-card, .cta-section > *'
    )

    revealEls.forEach((el, i) => {
      const e = el as HTMLElement
      e.style.opacity = '0'
      e.style.transform = 'translateY(28px)'
      e.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${(i % 4) * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${(i % 4) * 0.1}s`
    })

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          io.unobserve(el)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })

    revealEls.forEach(el => io.observe(el))

    // ── SMOOTH SCROLL ───────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const href = (anchor as HTMLAnchorElement).getAttribute('href')
        if (!href || href === '#') return
        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    })

  }, [])

  return null
}
