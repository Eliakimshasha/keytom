'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const visualRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for hero elements
      const tl = gsap.timeline({ delay: 0.5 })

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .from(subtitleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.7')
      .from(descRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.5')
      .from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.3')
      .from(visualRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out'
      }, '-=1')

      // Floating animation for visual elements
      gsap.to(visualRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen mesh-gradient overflow-hidden pt-16">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-keytom-purple/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-keytom-peach/30 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 pb-20 relative z-10 pt-16">
        <div className="grid relative lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start min-h-[62vh] ">
          <div>
            <div ref={titleRef} className="overflow-hidden">
              <h1 className="text-[clamp(3.6rem,8vw,7.6rem)] font-semibold text-keytom-blue leading-[0.9] tracking-[-0.02em]">
                Financial<br />Institution
              </h1>
            </div>
          </div>
          <div ref={subtitleRef} className="text-right absolute bottom-0 right-0">
            <h2 className="text-[clamp(2.8rem,6vw,6.2rem)] font-semibold text-keytom-blue leading-[0.9] tracking-[-0.01em]">
              Imagine<br />more
            </h2>
          </div>
        </div>

        <div className="mt-8">
          <div className="relative h-px bg-white/70">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block h-3 w-[1px] bg-white/90" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block h-[1px] w-3 bg-white/90" />
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div>
            <p ref={descRef} className="text-sm sm:text-base text-white max-w-md leading-relaxed">
              Combine your crypto and fiat into one intuitive platform. Instantly send, receive, 
              and hold funds across currencies, with smart tools and global reach.
            </p>

            <button 
              ref={ctaRef}
              className="group mt-8 w-full sm:w-72 px-8 py-5 bg-keytom-blue text-white rounded-2xl font-semibold text-[0.72rem] 
                tracking-[0.2em] uppercase flex items-center justify-between shadow-[0_14px_30px_rgba(47,107,255,0.35)]
                transition-all duration-300 hover:translate-y-0.5 hover:shadow-[0_18px_36px_rgba(47,107,255,0.45)]"
            >
              Open account
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
              </span>
            </button>
          </div>
          <div ref={visualRef} className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-keytom-peach/40 via-keytom-purple/30 to-keytom-blue/30 rounded-[40%] blur-2xl opacity-70" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-keytom-blue rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-keytom-blue rounded-full" />
        </div>
      </div>
    </section>
  )
}
