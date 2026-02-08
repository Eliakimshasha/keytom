'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const reasons = [
  {
    stat: '126+',
    label: 'countries supported',
    description: 'We onboard users from 126+ countries — whether you hold a passport or a residence permit — we\'ve got you covered.'
  },
  {
    stat: 'Low',
    label: 'service fees',
    description: 'Beneficial rates for exchanges and transfers, with full transparency and no hidden charges.',
    links: ['Fees for individuals', 'Fees for businesses']
  },
  {
    stat: '100%',
    label: 'online account opening',
    description: 'Sign up and open your account completely remote. All you need is your phone or computer. No trips to the office, no lines, no delays.'
  },
  {
    stat: 'Trusted',
    label: 'security',
    description: 'Advanced protection with $100M crypto insurance and secure infrastructure. Your assets stay safe from threats and unauthorized access.',
    link: 'Learn more?'
  }
]

export default function WhyKeytom() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%'
        },
        y: 50,
        duration: 1,
        ease: 'power3.out'
      })

      gsap.from('.reason-card', {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 70%'
        },
        y: 100,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 bg-[linear-gradient(100deg,#f3e6c9_0%,#efd7c7_45%,#d6a6bf_100%)]">
      <div className="absolute inset-0 pointer-events-none">
        <img src="/assets/images/star1.svg" alt="" className="absolute w-5 h-5 opacity-60 left-[4%] top-[12%]" />
        <img src="/assets/images/star1.svg" alt="" className="absolute w-5 h-5 opacity-60 left-[22%] top-[10%]" />
        <img src="/assets/images/star1.svg" alt="" className="absolute w-5 h-5 opacity-60 left-[48%] top-[14%]" />
        <img src="/assets/images/star1.svg" alt="" className="absolute w-5 h-5 opacity-60 left-[72%] top-[11%]" />
        <img src="/assets/images/star1.svg" alt="" className="absolute w-5 h-5 opacity-60 left-[94%] top-[13%]" />
      </div>

      <div className="absolute left-[14%] top-[18%] text-[clamp(3rem,11vw,10rem)] font-semibold tracking-[-0.02em] text-white/35 pointer-events-none select-none">
        WhyKeytom?
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef}>
          <h2 className="sr-only">Why Keytom</h2>
        </div>

        <div ref={cardsRef} className="grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-[1100px] mx-auto">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="reason-card bg-[rgba(253,249,242,0.9)] border border-white/70 rounded-[18px] p-6 min-h-[320px] flex flex-col gap-4 shadow-[0_20px_50px_rgba(159,118,129,0.2)]"
            >
              <div>
                <h3 className="text-[clamp(2.2rem,3.4vw,3.5rem)] font-semibold text-[#b07f8d] leading-none mb-1">
                  {reason.stat}
                </h3>
                <p className="text-[1.1rem] font-semibold text-[#b07f8d]">{reason.label}</p>
              </div>

              <p className="text-[0.9rem] leading-[1.5] text-[rgba(176,127,141,0.85)] mt-auto">
                {reason.description}
              </p>

              {reason.links && (
                <div className="flex flex-col gap-1">
                  {reason.links.map((link, i) => (
                    <a
                      key={i}
                      href="#"
                      className="text-[0.9rem] font-semibold text-[rgba(176,127,141,0.9)] underline underline-offset-4"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              )}

              {reason.link && (
                <a
                  href="#"
                  className="text-[0.9rem] font-semibold text-[rgba(176,127,141,0.9)] underline underline-offset-4"
                >
                  {reason.link}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
