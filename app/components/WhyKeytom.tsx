'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reasons = [
  {
    stat: '126+',
    label: 'countries supported',
    description:
      "We onboard users from 126+ countries, whether you hold a passport or a residence permit we've got you covered."
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
  const sectionRef = useRef<HTMLElement | null>(null)
  const titleRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const sliderRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
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

      mm.add('(max-width: 767px)', () => {
        const section = sectionRef.current
        const track = trackRef.current
        const slider = sliderRef.current ?? track?.parentElement
        if (!section || !track || !slider) return

        const getScrollAmount = () => {
          const currentX = gsap.getProperty(track, 'x')
          gsap.set(track, { x: 0 })

          const sliderRect = slider.getBoundingClientRect()
          const base = Math.max(0, track.scrollWidth - sliderRect.width)
          const tail = Math.max(16, sliderRect.width * 0.38)
          const amount = base + tail

          gsap.set(track, { x: currentX })
          return amount
        }

        if (getScrollAmount() <= 0) return

        const moveTween = gsap.to(track, {
          x: () => `-${getScrollAmount()}px`,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getScrollAmount()}px`,
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        })

        const handleLoad = () => ScrollTrigger.refresh()

        const resizeObserver = new ResizeObserver(() => {
          ScrollTrigger.refresh()
        })

        resizeObserver.observe(track)
        resizeObserver.observe(slider)

        if (document.readyState === 'complete') {
          handleLoad()
        } else {
          window.addEventListener('load', handleLoad)
        }

        return () => {
          window.removeEventListener('load', handleLoad)
          resizeObserver.disconnect()
          moveTween.scrollTrigger?.kill()
          moveTween.kill()
        }
      })

      return () => mm.revert()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24  lg:min-h-[110vh] bg-[linear-gradient(100deg,#f3e6c9_0%,#efd7c7_45%,#d6a6bf_100%)] max-[767px]:min-h-[100vh] max-[767px]:pt-36 max-[767px]:pb-0"
    >
      <div className="absolute inset-0 pointer-events-none">
        <img src="/assets/images/star1.svg" alt="" className="absolute w-5 h-5 opacity-60 left-[4%] top-[12%]" />
        <img src="/assets/images/star1.svg" alt="" className="absolute w-5 h-5 opacity-60 left-[22%] top-[10%]" />
        <img src="/assets/images/star1.svg" alt="" className="absolute w-5 h-5 opacity-60 left-[48%] top-[14%]" />
        <img src="/assets/images/star1.svg" alt="" className="absolute w-5 h-5 opacity-60 left-[72%] top-[11%]" />
        <img src="/assets/images/star1.svg" alt="" className="absolute w-5 h-5 opacity-60 left-[94%] top-[13%]" />
      </div>

      <div
        ref={titleRef}
        className="text-center text-[clamp(3rem,11vw,10rem)] font-semibold tracking-[-0.02em] text-white/35 pointer-events-none select-none"
      >
        Why Keytom?
      </div>

      <div className="mx-auto  w-full z-50">
        <div ref={sliderRef} className="max-[767px]:overflow-hidden">
          <div
            ref={trackRef}
            className="left-1/2  -translate-x-1/2 w-full md:absolute md:-bottom-36 max-w-[1200px] mx-auto md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 max-[767px]:static max-[767px]:translate-x-0 max-[767px]:mt-8 max-[767px]:flex max-[767px]:flex-row max-[767px]:flex-nowrap max-[767px]:gap-4 max-[767px]:pr-6"
          >
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="reason-card bg-[rgba(253,249,242,0.9)] border border-white/70 rounded-[3px] p-6 min-h-[320px] flex flex-col gap-4  shadow-[0_20px_50px_rgba(159,118,129,0.2)] max-[767px]:flex-none max-[767px]:w-[76vw] sm:max-[767px]:w-[60vw] md:w-auto"
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
      </div>
    </section>
  )
}
