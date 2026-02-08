'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const features = [
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
  }
]

export default function VirtualCard() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardStackRef = useRef(null)
  const featuresRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.to(cardStackRef.current, {
        rotation: 360,
        duration: 22,
        repeat: -1,
        ease: 'none'
      })

      gsap.from('.vc-item', {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 75%'
        },
        x: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out'
      })

      gsap.to('.vc-desc', {
        height: 0,
        opacity: 0,
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 15%',
          end: 'bottom 55%',
          scrub: true
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-28">
      <div className="container mx-auto px-6">
        <h2 ref={titleRef} className="text-[#3a57b5] font-semibold text-[clamp(2.6rem,4.6vw,4.8rem)] mb-8">
          Keytom Virtual
        </h2>

        <div className="grid grid-cols-[1.05fr_1fr] gap-12 items-center">
          <div className="flex items-center justify-center min-h-[420px]">
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

          <div ref={featuresRef} className="border-t border-[#b9c4ff]">
            {features.map((feature, index) => (
              <div key={index} className="vc-item py-4 border-b border-[#b9c4ff]">
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#b9c4ff] text-[#3a57b5] font-semibold text-[0.95rem] min-w-[56px] justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#3a57b5]" />
                    <span>{feature.number}</span>
                  </div>
                  <h3 className="text-[1.2rem] font-semibold text-[#3a57b5]">{feature.title}</h3>
                </div>
                <p className="vc-desc ml-[72px] mt-2 text-[0.98rem] leading-snug text-[#4b5fc0] overflow-hidden">
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
