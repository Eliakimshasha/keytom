'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Intro() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const containerRef = useRef(null)
  const headlineRef = useRef(null)

  useEffect(() => {
    const cards = cardsRef.current
    const container = containerRef.current
    const headline = headlineRef.current
    const section = sectionRef.current
    
    // Start with cards visible at their initial positions
    gsap.set(cards, { autoAlpha: 1 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=3000',
        scrub: 1,
        pin: true,
      },
    })

    // Get the center of the intro-section
    const sectionRect = section.getBoundingClientRect()
    const sectionCenterX = sectionRect.left + sectionRect.width / 2
    const sectionCenterY = sectionRect.top + sectionRect.height / 2

    // Move all cards to the exact center of the section
    cards.forEach((card, i) => {
      const cardRect = card.getBoundingClientRect()
      
      // Calculate the center of the card
      const cardCenterX = cardRect.left + cardRect.width / 2
      const cardCenterY = cardRect.top + cardRect.height / 2
      
      // Calculate how much to move the card center to align with section center
      const translateX = sectionCenterX - cardCenterX
      const translateY = sectionCenterY - cardCenterY

      const zIndexValue = i === 3 ? 100 : 1

      tl.to(card, {
        x: translateX,
        y: translateY,
        scale: 1,
        zIndex: zIndexValue,
        duration: 2,
        ease: 'power2.inOut'
      }, 0)
    })

    // Fade out headline as cards move to center
    tl.to(headline, {
      autoAlpha: 0,
      duration: 0.5,
    }, 1)

    // Fade out all cards EXCEPT Card 4 as they reach center
    cards.forEach((card, i) => {
      if (i !== 3) { // Skip Card 4
        tl.to(card, {
          autoAlpha: 0,
          duration: 1,
        }, 1)
      }
    })

    // Hold Card 4 at center for a moment
    tl.to({}, { duration: 0.2 })

    // Finally fade out Card 4
    tl.to(cards[3], {
      autoAlpha: 0,
      duration: 1,
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="intro-section relative min-h-screen overflow-hidden"
    >
      <div className="intro-glow intro-glow-primary" />
      <div className="intro-glow intro-glow-secondary" />
      <div className="intro-noise" />
      <div 
        ref={containerRef}
        className="container mx-auto px-6 min-h-screen flex items-center justify-center py-28 "
      >
        <p 
          ref={headlineRef}
          className="intro-headline text-center max-w-2xl z-20 relative"
        >
          A next-generation digital financial institution built for people and
          businesses who move fast and think global.
        </p>

        {/* Cards */}
        {[...Array(6)].map((_, i) => {
          const initialPositions = [
            { top: '260px', left: '-210px' },
            { top: '-280px', right: '-10px' },
            { bottom: '-260px', left: '5px' },
            { top: '-280px', left: '70px' },
            { bottom: '-270px', right: '-100px' },
            { top: '300px', right: '-220px' },
          ]

          const cardData = [
            { 
              bg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', 
              icon: '💳',
              title: 'Virtual Cards',
              subtitle: 'Instant creation'
            },
            { 
              bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
              icon: '🌍',
              title: 'Global Transfers',
              subtitle: 'Zero fees'
            },
            { 
              bg: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', 
              icon: '⚡',
              title: 'Instant Payments',
              subtitle: 'Real-time'
            },
            { 
              bg: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)', 
              icon: '🔒',
              title: 'Secure Vault',
              subtitle: 'Bank-grade security'
            },
            { 
              bg: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', 
              icon: '📊',
              title: 'Smart Analytics',
              subtitle: 'AI-powered insights'
            },
            { 
              bg: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)', 
              icon: '💰',
              title: 'Multi-Currency',
              subtitle: '150+ currencies'
            },
          ]

          const zIndex = i === 3 ? 100 : 90

          return (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="absolute w-52 h-64  rounded-xs flex flex-col items-center justify-center text-white p-6"
              style={{
                ...initialPositions[i],
                zIndex: zIndex,
                background: cardData[i].bg,
              }}
            >
              <div className="text-5xl mb-4">{cardData[i].icon}</div>
              <h3 className="text-xl font-bold text-center mb-2">{cardData[i].title}</h3>
              <p className="text-sm opacity-90 text-center">{cardData[i].subtitle}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}