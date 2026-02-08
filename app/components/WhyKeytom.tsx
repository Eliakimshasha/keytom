'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reasons = [
  {
    stat: '126+',
    label: 'countries supported',
    description:
      "We onboard users from 126+ countries — whether you hold a passport or a residence permit — we've got you covered."
  },
  {
    stat: 'Low service',
    label: 'fees',
    description:
      'Beneficial rates for exchanges and transfers, with full transparency and no hidden charges.',
    links: ['Fees for individuals', 'Fees for businesses']
  },
  {
    stat: '100% online',
    label: 'account opening',
    description:
      'Sign up and open your account completely remote. All you need is your phone or computer. No trips to the office, no lines, no delays.'
  },
  {
    stat: 'Trusted',
    label: 'security',
    description:
      'Advanced protection with $100M crypto insurance and secure infrastructure. Your assets stay safe from threats and unauthorized access.',
    link: 'Learn more?'
  }
]

export default function WhyKeytom() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add('(min-width: 901px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=120%',
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        })

        // cards move up but stop around bottom-20
        tl.fromTo(
          '.reason-card',
          { y: 200, opacity: 0 },
          {
            y: -300, // ≈ bottom-36 → bottom-20
            opacity: 1,
            stagger: 0.15,
            ease: 'power3.out',
            duration: 1.5
          }
        )

        // fade out big title while cards move
        tl.to(
          titleRef.current,
          {
            opacity: 0.35,
            ease: 'power2.out',
            duration: 1.2
          },
          0.1
        )
      })

      mm.add('(max-width: 900px)', () => {
        gsap.from('.reason-card', {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%'
          },
          y: 40,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out'
        })
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      mm.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 min-h-[100vh] lg:min-h-[110vh] bg-[linear-gradient(100deg,#f3e6c9_0%,#efd7c7_45%,#d6a6bf_100%)] max-[900px]:py-16 max-[900px]:min-h-[auto]"
    >
      <div className="absolute inset-0 pointer-events-none max-[900px]:hidden">
        <img src="/assets/images/star1.svg" alt="" className="absolute w-5 h-5 opacity-60 left-[4%] top-[12%]" />
        <img src="/assets/images/star1.svg" alt="" className="absolute w-5 h-5 opacity-60 left-[22%] top-[10%]" />
        <img src="/assets/images/star1.svg" alt="" className="absolute w-5 h-5 opacity-60 left-[48%] top-[14%]" />
        <img src="/assets/images/star1.svg" alt="" className="absolute w-5 h-5 opacity-60 left-[72%] top-[11%]" />
        <img src="/assets/images/star1.svg" alt="" className="absolute w-5 h-5 opacity-60 left-[94%] top-[13%]" />
      </div>

      <div
        ref={titleRef}
        className="text-center text-[clamp(3rem,11vw,10rem)] font-semibold tracking-[-0.02em] text-white/35 pointer-events-none select-none max-[900px]:text-[clamp(2.2rem,8vw,4.2rem)]"
      >
        Why Keytom?
      </div>

      <div className="mx-auto px-6 w-full z-50">
        <div
          ref={cardsRef}
          className="grid left-1/2 -translate-x-1/2 w-full absolute -bottom-36 gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-[1100px] mx-auto max-[900px]:static max-[900px]:translate-x-0 max-[900px]:mt-8 max-[900px]:grid-cols-1"
        >
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="reason-card bg-[rgba(253,249,242,0.9)] border border-white/70 rounded-[3px] p-6 min-h-[320px] flex flex-col gap-4 shadow-[0_20px_50px_rgba(159,118,129,0.2)] max-[900px]:min-h-[260px]"
            >
              <div>
                <h3 className="text-[30px] font-bold text-[#b07f8d] leading-none mb-1">
                  {reason.stat}
                </h3>
                <p className="text-[1.1rem] font-semibold text-[#b07f8d]">
                  {reason.label}
                </p>
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
