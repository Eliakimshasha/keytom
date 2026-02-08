'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../app/components/Navbar'
import Hero from '../app/components/Hero'
import Services from '../app/components/Services'
import VirtualCard from '../app/components/VirtualCard'
import WhyKeytom from '../app/components/WhyKeytom'
import BuiltFor from '../app/components/BuiltFor'
import Comparison from '../app/components/Comparison'
import FAQ from '../app/components/Faqs'
import Footer from '../app/components/Footer'
import Intro from '../app/components/Intro'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <main ref={mainRef} className="overflow-x-hidden">
      <Header />
      <Hero />
      <Intro />
      <Services />
      <VirtualCard />
      <WhyKeytom />
      <BuiltFor />
      <Comparison />
      <FAQ />
      <Footer />
    </main>
  )
}