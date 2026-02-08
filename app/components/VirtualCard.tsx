'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const features: Array<{ number: string; title: string; description: string }> = [
  {
    number: '1',
    title: 'Easy & fully online',
    description: 'Set up your Keytom card in a few simple steps -- fully online, no office visits required.'
  },
  {
    number: '2',
    title: 'Pay online or in-store',
    description: 'Use your card for online purchases or in-store payments at over 130 million locations.'
  },
  {
    number: '3',
    title: 'Top up using digital assets',
    description: 'Convert selected digital assets into funds through Keytom to easily load your card balance.'
  },
  {
    number: '4',
    title: 'Contactless payments',
    description: 'Tap to pay at stores, cafes, and more -- secure, quick, and hassle-free.'
  },
  {
    number: '5',
    title: 'ATM access',
    description: 'Withdraw cash at supported ATMs, with easy access to your funds whenever you need them.'
  }
]

export default function VirtualCard() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const cardStackRef = useRef<HTMLDivElement | null>(null)
  const featuresRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      if (!sectionRef.current || !featuresRef.current) return

      // Title animation
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%'
          },
          x: -100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        })
      }

      // Card stack animation
      if (cardStackRef.current) {
        gsap.from(cardStackRef.current, {
          scrollTrigger: {
            trigger: cardStackRef.current,
            start: 'top 70%'
          },
          scale: 0.9,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        })
      }

      // Continuous rotation
      if (cardStackRef.current) {
        gsap.to(cardStackRef.current, {
          rotation: 360,
          duration: 22,
          repeat: -1,
          ease: 'none'
        })
      }

      const items = gsap.utils.toArray<HTMLElement>('.vc-item', featuresRef.current)
      
      // Set all items to start far below, hidden
      items.forEach((item) => {
        gsap.set(item, { y: 500, opacity: 0 })
      })

      // Calculate total animation duration
      const scrollDistance = features.length * 600 // 600px scroll per item
      
      // Pin the entire section while items animate
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${scrollDistance}`,
        pin: true,
        pinSpacing: true,
        markers: false // Set to true for debugging
      })

      // Animate each item
      items.forEach((item, index) => {
        const desc = item.querySelector<HTMLElement>('.vc-desc')

        // Item comes up from below
        gsap.to(item, {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${index * 600} top`,
            end: `top+=${index * 600 + 300} top`,
            scrub: 1
          }
        })

        // Hide description when next item starts coming
        if (desc) {
          gsap.to(desc, {
            height: 0,
            opacity: 0,
            marginTop: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${index * 600 + 300} top`,
              end: `top+=${index * 600 + 450} top`,
              scrub: 1
            }
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-28 min-h-screen">
      <div className="container mx-auto px-6">
        <h2 ref={titleRef} className="text-[#3a57b5] font-semibold text-[clamp(2.6rem,4.6vw,4.8rem)] mb-8">
          Keytom Virtual
        </h2>

        <div className="grid grid-cols-[1.05fr_1fr] gap-12 items-start">
          <div className="flex items-center justify-center min-h-[420px] sticky top-20">
            <div ref={cardStackRef} className="relative w-[min(90%,460px)] h-[320px] [transform-style:preserve-3d]">
              <img
                src="/assets/images/card1.jpeg"
                alt=""
                className="w-full max-w-[460px] rounded-[18px] [transform:rotateY(-8deg)_rotateX(6deg)_rotateZ(-6deg)]"
              />
              <img
                src="/assets/images/card2.jpeg"
                alt=""
                className="absolute w-[86%] right-[-8%] top-[18%] rounded-[18px] opacity-85 [transform:rotateY(-8deg)_rotateX(6deg)_rotateZ(6deg)]"
              />
            </div>
          </div>

          <div ref={featuresRef} className="border-t border-[#b9c4ff] overflow-hidden relative">
            {features.map((feature, index) => (
              <div key={index} className="vc-item py-4 border-b border-[#b9c4ff]">
                <div className="vc-header flex items-center gap-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#b9c4ff] text-[#3a57b5] font-semibold text-[0.95rem] min-w-[56px] justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#3a57b5]" />
                    <span>{feature.number}</span>
                  </div>
                  <h3 className="text-[1.2rem] font-semibold text-[#3a57b5]">{feature.title}</h3>
                </div>
                <p className="vc-desc ml-[72px] mt-2 text-[0.98rem] leading-snug text-[#4b5fc0]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
