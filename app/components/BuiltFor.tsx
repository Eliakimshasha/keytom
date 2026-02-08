'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaApple, FaGooglePlay } from 'react-icons/fa'

export default function BuiltFor() {
  const sectionRef = useRef(null)
  const [activeTab, setActiveTab] = useState('individuals')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.builtfor-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [activeTab])

  const cardBase =
    'builtfor-card relative overflow-hidden rounded-[16px] p-6 text-white shadow-[0_20px_40px_rgba(148,109,132,0.25)] ' +
    'bg-[linear-gradient(180deg,#9d7ba3_0%,#b58cab_45%,#d4a9a1_100%)]'

  return (
    <section ref={sectionRef} className="bg-white text-[#1f1f1f] py-[120px]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-[clamp(2.4rem,4vw,4.2rem)] font-semibold text-[#404040] mb-4">Built for</h2>
          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('individuals')}
              className={`inline-flex items-center gap-2 px-6 py-2 rounded-full border text-[1rem] font-semibold transition-all ${
                activeTab === 'individuals'
                  ? 'bg-[#9c7aa0] text-white border-transparent'
                  : 'bg-white text-[#3a59b8] border-[#7e8fe0]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current" />
              Individuals
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('businesses')}
              className={`inline-flex items-center gap-2 px-6 py-2 rounded-full border text-[1rem] font-semibold transition-all ${
                activeTab === 'businesses'
                  ? 'bg-[#9c7aa0] text-white border-transparent'
                  : 'bg-white text-[#3a59b8] border-[#7e8fe0]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current" />
              Businesses
            </button>
          </div>
        </div>

        {activeTab === 'individuals' ? (
          <div className="grid grid-cols-2 gap-6 max-w-[1100px] mx-auto max-[900px]:grid-cols-1">
            <div className="flex flex-col gap-[18px]">
              <div className={`${cardBase} min-h-[320px]`}>
                <div>
                  <h3 className="text-[1.4rem] font-semibold mb-2">Global fund transfer</h3>
                  <p className="text-[0.95rem] leading-[1.5] text-white/90">
                    Receive and send funds in fiat and make borderless crypto transfers to and from over 100 countries.
                  </p>
                </div>
                <div className="absolute left-[26px] bottom-[18px] w-[220px] h-[160px] pointer-events-none">
                  <img
                    src="/assets/images/circle3.svg"
                    alt=""
                    className="absolute w-[130px] h-[130px] object-contain opacity-95 left-0 bottom-0 z-[3]"
                  />
                  <img
                    src="/assets/images/circle5.svg"
                    alt=""
                    className="absolute w-[130px] h-[130px] object-contain opacity-70 left-[62px] bottom-[8px] z-[2]"
                  />
                  <img
                    src="/assets/images/circle6.svg"
                    alt=""
                    className="absolute w-[130px] h-[130px] object-contain opacity-50 left-[118px] bottom-[12px] z-[1] blur-[0.6px]"
                  />
                </div>
              </div>

              <div className={`${cardBase} min-h-[140px]`}>
                <div>
                  <h3 className="text-[1.4rem] font-semibold mb-2">Crypto &amp; fiat accounts</h3>
                  <p className="text-[0.95rem] leading-[1.5] text-white/90">
                    Named fiat and crypto accounts available in EUR, USDC, BTC, ETH, and 10+ other currencies.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[18px]">
              <div className={`${cardBase} min-h-[140px]`}>
                <div>
                  <h3 className="text-[1.4rem] font-semibold mb-2">Quick account setup</h3>
                  <p className="text-[0.95rem] leading-[1.5] text-white/90">
                    Accounts are opened within minutes. Onboarding takes less than an hour.
                  </p>
                </div>
              </div>

              <div className={`${cardBase} min-h-[320px] flex flex-col gap-4`}>
                <div>
                  <h3 className="text-[1.4rem] font-semibold mb-2">Virtual cards</h3>
                  <p className="text-[0.95rem] leading-[1.5] text-white/90">
                    Virtual cards linked to your crypto wallet, enabling seamless payments with automatic conversion via your phone.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button className="relative border border-white/70 rounded-[10px] px-4 py-2 pl-10 bg-transparent text-white font-semibold text-[0.9rem] leading-[1.1] flex flex-col items-start">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[1.15rem] opacity-95">
                      <FaApple />
                    </span>
                    <span className="text-[0.7rem] font-medium opacity-80">Download on the</span>
                    App Store
                  </button>
                  <button className="relative border border-white/70 rounded-[10px] px-4 py-2 pl-10 bg-transparent text-white font-semibold text-[0.9rem] leading-[1.1] flex flex-col items-start">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[1.15rem] opacity-95">
                      <FaGooglePlay />
                    </span>
                    <span className="text-[0.7rem] font-medium opacity-80">Get it on</span>
                    Google Play
                  </button>
                </div>

                <div className="absolute right-[28px] bottom-[26px] w-[210px] h-[180px] pointer-events-none max-[900px]:static max-[900px]:w-full max-[900px]:h-[120px] max-[900px]:mt-3">
                  <span className="absolute w-[140px] h-[100px] rounded-[14px] bg-[linear-gradient(140deg,#f7e3c6,#d6b1b7)] shadow-[0_16px_30px_rgba(143,98,113,0.3)] rotate-[-18deg] right-[62px] bottom-[56px]" />
                  <span className="absolute w-[140px] h-[100px] rounded-[14px] bg-[linear-gradient(140deg,#f7e3c6,#d6b1b7)] shadow-[0_16px_30px_rgba(143,98,113,0.3)] rotate-[6deg] right-[34px] bottom-[24px]" />
                  <span className="absolute w-[140px] h-[100px] rounded-[14px] bg-[linear-gradient(140deg,#f7e3c6,#d6b1b7)] shadow-[0_16px_30px_rgba(143,98,113,0.3)] rotate-[24deg] right-[-2px] bottom-[10px] opacity-85" />
                </div>

                <button className="mt-auto self-start bg-[#f9f2e9] text-[#3a59b8] px-4 py-2 rounded-[10px] uppercase text-[0.8rem] font-semibold inline-flex items-center gap-2">
                  Explore cards
                  <span className="w-[18px] h-[18px] rounded-full bg-[#3a59b8] inline-flex items-center justify-center">
                    <span className="w-[6px] h-[6px] border-r-2 border-b-2 border-white rotate-[-45deg] block" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 max-w-[980px] mx-auto max-[900px]:grid-cols-1">
            <div className="flex flex-col gap-[18px]">
              <div className={`${cardBase} min-h-[320px]`}>
                <div>
                  <h3 className="text-[1.4rem] font-semibold mb-2">Quick document review</h3>
                  <p className="text-[0.95rem] leading-[1.5] text-white/90">
                    Accounts are opened within one business week. The onboarding process takes less than 5 business days.
                  </p>
                </div>
              </div>
              <div className={`${cardBase} min-h-[140px]`}>
                <div>
                  <h3 className="text-[1.4rem] font-semibold mb-2">Fiat &amp; crypto accounts</h3>
                  <p className="text-[0.95rem] leading-[1.5] text-white/90">
                    Access EUR, USDC, BTC, ETH, and other currencies with ease.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[18px]">
              <div className={`${cardBase} min-h-[320px] flex flex-col gap-4`}>
                <div>
                  <h3 className="text-[1.4rem] font-semibold mb-2">
                    Third party transfers to and from individuals and businesses
                  </h3>
                  <p className="text-[0.95rem] leading-[1.5] text-white/90">
                    Receive payments from and send funds to more than 100 countries.
                  </p>
                </div>
                <button className="mt-auto self-start bg-[#f9f2e9] text-[#3a59b8] px-4 py-2 rounded-[10px] uppercase text-[0.8rem] font-semibold inline-flex items-center gap-2">
                  Explore business
                  <span className="w-[18px] h-[18px] rounded-full bg-[#3a59b8] inline-flex items-center justify-center">
                    <span className="w-[6px] h-[6px] border-r-2 border-b-2 border-white rotate-[-45deg] block" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
