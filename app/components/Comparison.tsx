'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IoCheckmark, IoClose, IoWarning, IoArrowForward } from 'react-icons/io5'

type Status = 'yes' | 'no' | 'limited'

type Feature = {
  name: string
  sub?: string
  subMuted?: string
  keytom: { status: Status; note: string }
  others: { status: Status; note: string }
  otc: { status: Status; note: string }
}

const features: Feature[] = [
  {
    name: 'Multi-currency account',
    sub: '(crypto + fiat)',
    keytom: { status: 'yes', note: 'Yes' },
    others: { status: 'limited', note: 'Limited support, often separated' },
    otc: { status: 'no', note: 'No' }
  },
  {
    name: 'Integrated crypto exchange',
    keytom: { status: 'yes', note: 'Yes' },
    others: { status: 'limited', note: 'Limited or non-existent' },
    otc: { status: 'yes', note: 'Yes' }
  },
  {
    name: 'IBAN/fiat accounts',
    keytom: { status: 'yes', note: 'Yes (named IBANs for SEPA transactions)' },
    others: { status: 'limited', note: 'Limited to EU/UK accounts' },
    otc: { status: 'no', note: 'No' }
  },
  {
    name: 'Third Party Payments',
    keytom: { status: 'yes', note: 'Yes (to and from businesses and individuals)' },
    others: { status: 'yes', note: 'Yes' },
    otc: { status: 'no', note: 'No' }
  },
  {
    name: 'Virtual & Physical cards',
    subMuted: '(coming soon)',
    keytom: { status: 'yes', note: 'Yes' },
    others: { status: 'limited', note: 'Yes, but not crypto friendly' },
    otc: { status: 'limited', note: 'Some offer only virtual or prepaid cards' }
  },
  {
    name: 'Time saving account opening',
    keytom: { status: 'yes', note: 'Up to 5 business days for businesses, just a few minutes for individuals. Fully online.' },
    others: { status: 'limited', note: 'Takes weeks, often offline' },
    otc: { status: 'yes', note: 'Quick' }
  },
  {
    name: 'Global availability',
    keytom: { status: 'yes', note: 'High (access in 126+ countries)' },
    others: { status: 'limited', note: 'Limited to certain regions' },
    otc: { status: 'yes', note: 'High' }
  }
]

export default function Comparison() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const tableRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })

      gsap.from('.comparison-row', {
        scrollTrigger: {
          trigger: tableRef.current,
          start: 'top 70%'
        },
        x: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const getIcon = (status: Status) => {
    switch (status) {
      case 'yes':
        return (
          <span className="w-[22px] h-[22px] rounded-full inline-flex items-center justify-center bg-[radial-gradient(circle_at_30%_30%,#b7b3ed,#4958b1_70%)] text-white text-[14px]">
            <IoCheckmark />
          </span>
        )
      case 'no':
        return (
          <span className="w-[22px] h-[22px] rounded-full inline-flex items-center justify-center bg-[#5e5e5e] text-white text-[13px]">
            <IoClose />
          </span>
        )
      case 'limited':
        return <IoWarning className="text-[#5a5a5a] text-[20px]" />
      default:
        return null
    }
  }

  return (
    <section ref={sectionRef} className="bg-white text-[#1f1f1f] py-[120px] pb-[100px]">
      <div className="container mx-auto px-6">
        <h2 ref={titleRef} className="text-center font-semibold text-[clamp(2.6rem,4.6vw,4.8rem)] text-[#4a4a4a] mb-10 max-[768px]:text-3xl">
          <span className="text-[#3657ba]">Keytom</span> vs others
        </h2>

        <div ref={tableRef} className="max-w-[1160px] mx-auto max-[900px]:max-w-none max-[900px]:-mx-6 max-[900px]:px-6 max-[900px]:overflow-x-auto">
          <div className="min-w-[880px]">
            <div className="grid grid-cols-[1.25fr_1.2fr_1.35fr_0.8fr] items-center border-b border-[#b9c4ff]">
              <div className="px-5 py-4 font-semibold text-[#3c3c3c]">Feature</div>
              <div className="px-5 py-4 font-semibold text-[#3657ba] bg-[#e1e5f4] rounded-t-[10px]">Keytom</div>
              <div className="px-5 py-4 font-semibold text-[#3c3c3c]">Other financial institutions</div>
              <div className="px-5 py-4 font-semibold text-[#3c3c3c]">OTC</div>
            </div>

            {features.map((feature, index) => (
              <div key={index} className="comparison-row grid grid-cols-[1.25fr_1.2fr_1.35fr_0.8fr] border-b border-[#b9c4ff]">
                <div className="px-5 py-5 flex flex-col gap-2">
                  <span className="text-[1.15rem] font-semibold text-[#3a57b5] leading-tight">{feature.name}</span>
                  {feature.sub && <span className="text-[1.1rem] font-semibold text-[#3a57b5]">{feature.sub}</span>}
                  {feature.subMuted && (
                    <span className="text-[1.05rem] font-semibold text-[#3a57b5]/35">{feature.subMuted}</span>
                  )}
                </div>

                <div className="px-5 py-4 flex items-center gap-3 bg-[#e1e5f4]">
                  {getIcon(feature.keytom.status)}
                  <span className="text-[0.98rem] text-[#4a4a4a] leading-snug">{feature.keytom.note}</span>
                </div>

                <div className="px-5 py-4 flex items-center gap-3">
                  {getIcon(feature.others.status)}
                  <span className="text-[0.98rem] text-[#4a4a4a] leading-snug">{feature.others.note}</span>
                </div>

                <div className="px-5 py-4 flex items-center gap-3">
                  {getIcon(feature.otc.status)}
                  <span className="text-[0.98rem] text-[#4a4a4a] leading-snug">{feature.otc.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-[1160px] mx-auto mt-5">
          <button className="inline-flex items-center gap-3 bg-[linear-gradient(90deg,#3a3752_0%,#2f458b_100%)] text-white px-5 py-3 rounded-md uppercase font-semibold text-[0.9rem] max-[900px]:w-full max-[900px]:justify-between">
            Open account
            <span className="w-[22px] h-[22px] rounded-full bg-white text-[#2f458b] inline-flex items-center justify-center text-[14px]">
              <IoArrowForward />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
