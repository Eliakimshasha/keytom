'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { FaCcVisa, FaBitcoin, FaEuroSign, FaPaperPlane, FaInbox, FaCreditCard, FaPiggyBank, FaPlusCircle, FaExchangeAlt } from "react-icons/fa";
import { TbChartInfographic } from 'react-icons/tb'

gsap.registerPlugin(ScrollTrigger)

export default function Intro() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const containerRef = useRef(null)
  const headlineRef = useRef(null)
  const circleRef = useRef(null)
  const circleTextRef = useRef(null)

  useEffect(() => {
    const cards = cardsRef.current
    const headline = headlineRef.current
    const section = sectionRef.current

    if (!section || !cards.length) return

    const mm = gsap.matchMedia()

    const buildTimeline = (endValue) => {
      // Start with cards visible at their initial positions
      gsap.set(cards, { autoAlpha: 1 })
      gsap.set(circleRef.current, { width: 0, height: 0, opacity: 0 })
      gsap.set(circleTextRef.current, { opacity: 0, y: 20 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: endValue,
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
        duration: 1,
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
      tl.to({}, { duration: 0.6 })

      // Grow reveal circle from center to full screen
      if (circleRef.current) {
        tl.to(circleRef.current, {
          width: '1100px',
          height: '1100px',
          opacity: 1,
          duration: 1.2,
          ease: 'power2.inOut'
        }, '+=0.1')
      }

      // Fade out Card 4 as the circle expands
      if (cards[3]) {
        tl.to(cards[3], {
          autoAlpha: 0,
          duration: 0.2,
        }, '<')
      }

      // Reveal text inside the circle
      if (circleTextRef.current) {
        tl.to(circleTextRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.3')
      }

      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    }

    mm.add('(min-width: 901px)', () => buildTimeline('+=3000'))
    mm.add('(max-width: 900px)', () => buildTimeline('+=1800'))

    return () => {
      mm.revert()
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
        ref={circleRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3c56ab] z-30 flex items-center justify-center text-white overflow-hidden pointer-events-none"
      >
        <div ref={circleTextRef} className="text-center px-6">
          <div className="flex flex-col  gap-4 text-[clamp(1.4rem,3.2vw,2.6rem)] font-semibold">
            <div className="flex items-center gap-3 border-b border-white/10 pb-2">
              <FaPaperPlane className="text-[1.3em]" />
              <span>Send</span>
            </div>
            <div className="flex items-center gap-3  border-b border-white/10 pb-2">
              <FaInbox className="text-[1.3em]" />
              <span>Receive</span>
            </div>
            <div className="flex items-center gap-3  border-b border-white/10 pb-2">
              <FaCreditCard className="text-[1.3em]" />
              <span>Pay</span>
            </div>
            <div className="flex items-center gap-3  border-b border-white/10 pb-2">
              <FaPiggyBank className="text-[1.3em]" />
              <span>Deposit</span>
            </div>
            <div className="flex items-center gap-3  border-b border-white/10 pb-2">
              <FaPlusCircle className="text-[1.3em]" />
              <span>Top-up</span>
            </div>
            <div className="flex items-center gap-3">
              <FaExchangeAlt className="text-[1.3em]" />
              <span>Convert</span>
            </div>
          </div>
        </div>
      </div>
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
              type: 'virtual-cards',
              bg: 'linear-gradient(135deg, #3b5998 0%, #2d4373 100%)',
            },
            { 
              type: 'euro-account',
              bg: 'linear-gradient(135deg, #4a6fa5 0%, #345a8c 100%)',
            },
            { 
              type: 'deposits',
              bg: 'linear-gradient(135deg, #f4d5a6 0%, #e6c28b 100%)',
            },
            { 
              type: 'euro-balance',
              bg: 'linear-gradient(135deg, #5273a8 0%, #3d5a8f 100%)',
            },
            { 
              type: 'crypto',
              bg: 'linear-gradient(135deg, #c99ca6 0%, #b08593 100%)',
            },
            { 
              type: 'transactions',
              bg: 'linear-gradient(135deg, #e8c98f 0%, #d4b47a 100%)',
            },
          ]

          const zIndex = i === 3 ? 100 : 90

          return (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`intro-card absolute w-36 h-42 rounded-2xl overflow-hidden shadow-sm ${i === 1 ? 'max-[768px]:hidden' : ''}`}
              style={{
                ...initialPositions[i],
                zIndex: zIndex,
                background: cardData[i].bg,
              }}
            >
              {/* Card Content */}
              {cardData[i].type === 'virtual-cards' && (
                <div className="relative w-full h-full p-6 flex flex-col justify-between text-white">
                  {/* Decorative card images */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-60">
                    <div className="relative w-32 h-44">
                      
                     
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="text-sm font-medium opacity-90"></div>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text- font-semibold">Virtual cards</h3>
                  </div>
                </div>
              )}

              {cardData[i].type === 'euro-account' && (
                <div className="relative w-full h-full p-5 flex flex-col justify-between text-white">
                  <div>
                    <h3 className="text-base font-medium mb-8">Euro Account</h3>
                    <div className="space-y-1.5">
                      <p className="text-xs opacity-80">GB44 1234 1234 1234 5678 90</p>
                      <p className="text-xs opacity-80">Balance: €7,367</p>
                    </div>
                  </div>
                </div>
              )}

              {cardData[i].type === 'deposits' && (
                <div className="relative w-full h-full p-6 flex flex-col justify-end text-[#4a6fa5]">
                 
                  <div className="mb-4">
                    <div className="text-3xl font-bold mb-1">€2,890</div>
                  </div>
                  <div>
                    <h3 className="text-base text-sm font-semibold mb-0.5">Deposits</h3>
                    <p className="text-sm opacity-80">and withdrawals</p>
                  </div>
                </div>
              )}

              {cardData[i].type === 'euro-balance' && (
                <div className="relative w-full h-full p-5 flex flex-col justify-between text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-[#4169b8] flex items-center justify-center">
                      <FaEuroSign className="text-xl" />
                    </div>
                    <span className="text-2xl font-semibold flex items-center gap-1">
                      EUR
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <div className="text-5xl font-bold mb-1">€4</div>
                    <p className="text-sm opacity-80">Balance</p>
                  </div>
                </div>
              )}

              {cardData[i].type === 'crypto' && (
                <div className="relative w-full h-full p-5 flex flex-col justify-between text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-[#b08593] flex items-center justify-center">
                      <FaEuroSign className="text-xl" />
                    </div>
                    <span className="text-2xl font-semibold">EUR</span>
                  </div>
                  <div>
                    <div className="text-5xl font-bold mb-3">€4</div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-md bg-white/90 flex items-center justify-center text-[#c99ca6] font-bold text-sm">
                        1L
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-[#f7931a] flex items-center justify-center">
                        <FaBitcoin className="text-xl text-white" />
                      </div>
                      <span className="text-xl font-semibold">BTC</span>
                    </div>
                    <div className="text-2xl font-bold mt-2">0.000011</div>
                  </div>
                </div>
              )}

              {cardData[i].type === 'transactions' && (
                <div className="relative w-full h-full p-6 flex flex-col justify-between text-[#4a6fa5]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-full bg-[#5a7fa8] flex items-center justify-center">
                      <TbChartInfographic className="text-xl text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Transactions</h3>
                    <p className="text-sm opacity-80">Track all activity</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
