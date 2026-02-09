'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'
import start from '../../public/assets/images/star1.svg'
import Image from 'next/image'

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const visualRef = useRef(null)
  const starRef = useRef(null)
  const redLineRef = useRef(null)
  const blueLineRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Master timeline for sequential animations
      const masterTl = gsap.timeline({ delay: 0.3 })

      // Step 1: Rotate star image 90 degrees
      masterTl.from(starRef.current, {
        rotation: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      })
      .to(starRef.current, {
        rotation: 180,
        duration: 0.8,
        ease: 'power2.inOut'
      }, '-=0.8')

      // Step 2: Expand the lines from 20px to full width
      masterTl.to([redLineRef.current, blueLineRef.current], {
        width: '100%',
        duration: 1.2,
        ease: 'power3.inOut',
        stagger: 0.1
      }, '+=0.2')

      // Step 3: Animate content elements together after lines expand
      // H1 comes from top
      masterTl.from(titleRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.3')

      // H2 comes from bottom (same time as h1)
      masterTl.from(subtitleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '<')

      // Paragraph comes from top (same time as h1 and h2)
      masterTl.from(descRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out'
      }, '<')

      // Button comes from bottom (same time as others)
      masterTl.from(ctaRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'back.out(1.7)',
        clearProps: 'transform'
      }, '<')

      // Visual element fades in
      masterTl.from(visualRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      }, '<')

      // Floating animation for visual elements (continuous)
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
    <section ref={heroRef} className="hero-pin min-h-screen mesh-gradient overflow-hidden max-[768px]:flex max-[768px]:items-center pt-16 max-[768px]:pt-0">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-keytom-purple/20 rounded-full blur-3xl max-[768px]:hidden" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-keytom-peach/30 rounded-full blur-3xl max-[768px]:hidden" />
      
      <div className="lg:pl-14  mx-auto px-6 pb-20 relative z-10 pt-16 max-[768px]:pt-0 max-[768px]:pb-12">
        <div className="grid  relative lg:grid-cols-[1.1fr_0.9fr] items-start min-h-[45vh] max-[768px]:min-h-[28vh] max-[768px]:gap-6">
          <div>
            <div ref={titleRef} className="overflow-hidden">
              <h1 className="text-[clamp(1.2rem,8vw,5rem)] font-bolder text-[#38488B]  leading-[0.9] tracking-[-0.02em]">
                Financial<br />Institution
              </h1>
            </div>
          </div>
          <div ref={subtitleRef} className="text-right absolute bottom-0 right-0 max-[768px]:static  max-[768px]:mt-4">
            <h2 className="text-[clamp(2.8rem,6vw,5rem)] max-[768px]:text-3xl font-semibold text-[#38488B] leading-[0.9] tracking-[-0.01em]">
              Imagine<br />more
            </h2>
          </div>
        </div>

        <div className="">
          <div className="relative">
            <span 
              ref={redLineRef}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block h-[2px] w-[20px] bg-white" 
            />
            <span 
              ref={blueLineRef}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block h-[2px] w-[20px] bg-white" 
            />
            <Image 
              ref={starRef}
              src={start} 
              alt="Start" 
              className="mx-auto w-12 h-12" 
            />
          </div>
        </div>

        <div className=" grid lg:grid-cols-[1.1fr_0.9fr] items-start max-[768px]:gap-6">
          <div>
            <p ref={descRef} className="text-sm intro-headline2 sm:text-base  max-w-md leading-relaxed">
              Combine your crypto and fiat into one intuitive platform. Instantly send, receive, 
              and hold funds across currencies, with smart tools and global reach.
            </p>

            <button 
              ref={ctaRef}
              className="group w-full sm:w-72 mt-6 max-[900]:mt-2 px-8 max-[900]:py-5 py-3 bg-[#38488B] text-white  font-semibold text-[0.72rem] 
                tracking-[0.2em] uppercase flex items-center justify-between
                transition-all duration-300 hover:translate-y-0.5"
            >
              Open account
              <span className="w-7 h-7 rotate-3 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
              </span>
            </button>
          </div>
          <div ref={visualRef} className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-keytom-peach/40 via-keytom-purple/30 to-keytom-blue/30 rounded-[40%] blur-2xl opacity-70" />
          </div>
        </div>
      </div>


    </section>
  )
}
