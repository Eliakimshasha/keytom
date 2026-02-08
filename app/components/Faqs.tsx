'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type FAQItem = { q: string; a: string }
type FAQSections = Record<string, FAQItem[]>
type FAQData = { individuals: FAQSections; businesses?: FAQSections }

const faqData: FAQData = {
  individuals: {
    'Getting Started': [
      {
        q: 'Can I open an account if I\'m not from the EU?',
        a: 'Yes, we support customers from 120+ countries, the full list is here. Our tool is available to help you understand our capabilities for your case.'
      },
      {
        q: 'I have a residence permit, will it work?',
        a: 'Yes, the residence permit works for us, your nationality can be any as long as the residence permit is in the accepted countries list.'
      },
      {
        q: 'Can I receive salary payments to the account?',
        a: 'Yes, we support any third party payments to your account, you can receive and send funds from and to both businesses and individuals.'
      },
      {
        q: 'How long does it take to have a fully operational account?',
        a: 'It takes about an hour to provide you with IBAN and Card. Crypto is available within minutes.'
      }
    ],
    'Crypto & Fiat': [
      {
        q: 'What crypto currencies can I have?',
        a: 'We provide access to 10+ crypto currencies, which include the standard ones: ETH, BTC, USDC and more exotic: XRP, LTC, SOL.'
      },
      {
        q: 'For the exchange do I have to visit another app?',
        a: 'No, all the operations -- including exchanges -- are available in a single Keytom app. You can use it on your phone via the web version or by downloading it from the App Store or Google Play.'
      }
    ],
    Cards: [
      {
        q: 'How am I topping up the card?',
        a: 'You can load your account with USDC or exchange your Euro to USDC to top up your card account. As long as you have USDC you have the capabilities to use the card.'
      },
      {
        q: 'Is the card virtual or physical?',
        a: 'At the moment the card is virtual, however you can use Apple Pay or Google Pay for offline and online purchases.'
      }
    ],
    'Security & Privacy': [
      {
        q: 'Are you licensed?',
        a: 'Yes: Cryptocurrency and fiat services are provided legally by Money Services Business KEYTOM SERVICES LTD under the MSB FINTRAC licence, registered in Canada.'
      },
      {
        q: 'How are my funds protected?',
        a: 'Client crypto assets are insured up to $100M through institutional-grade coverage. Fiat funds are fully safeguarded in segregated accounts.'
      }
    ]
  }
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [activeTab, setActiveTab] = useState<'individuals' | 'businesses'>('individuals')
  const [activeCategory, setActiveCategory] = useState<string>('Getting Started')
  const [openItems, setOpenItems] = useState<number[]>([])
  const activeData = (faqData[activeTab] ?? faqData.individuals) as FAQSections

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const categories = Object.keys(activeData)
    if (!categories.includes(activeCategory)) {
      setActiveCategory(categories[0])
      setOpenItems([])
    }
  }, [activeTab, activeCategory, activeData])

  const toggleItem = (index: number) => {
    setOpenItems(prev => (prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]))
  }

  const categories = Object.keys(activeData)
  const currentQuestions = activeData[activeCategory] || []

  return (
    <section ref={sectionRef} className="bg-[#f4f6ff] py-28 max-[900px]:py-16">
      <div className="container mx-auto px-6">
        <h2 className="faq-title text-center font-semibold text-[clamp(2.6rem,4.4vw,4.6rem)] text-[#3a57b5] mb-7 max-[768px]:text-3xl">
          FAQ
        </h2>

        <div className="flex justify-center mb-9">
          <div className="inline-flex items-center gap-2 max-[900px]:flex-wrap max-[900px]:justify-center">
            <button
              type="button"
              onClick={() => setActiveTab('individuals')}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border text-[1rem] font-semibold max-[900px]:px-4 max-[900px]:text-[0.95rem] ${
                activeTab === 'individuals'
                  ? 'bg-[#e1e5f4] text-[#3a57b5] border-transparent'
                  : 'bg-white text-[#5b66b0] border-[#b9c4ff]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current" />
              Individuals
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('businesses')}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border text-[1rem] font-semibold max-[900px]:px-4 max-[900px]:text-[0.95rem] ${
                activeTab === 'businesses'
                  ? 'bg-[#e1e5f4] text-[#3a57b5] border-transparent'
                  : 'bg-white text-[#5b66b0] border-[#b9c4ff]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current" />
              Businesses
            </button>
          </div>
        </div>

        <div className="max-w-[1160px] mx-auto grid grid-cols-[0.9fr_2.1fr] gap-9 max-[900px]:grid-cols-1 max-[900px]:gap-6">
          <div className="border-t border-[#b9c4ff]">
            <div className="flex flex-col gap-2 pt-5">
              {categories.map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center gap-2 w-full text-left px-4 py-2 rounded-md font-semibold text-[1rem] text-[#3a57b5] ${
                    activeCategory === category ? 'bg-[#e1e5f4]' : 'bg-transparent'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-[#b9c4ff]">
            {currentQuestions.map((item, index) => (
              <div key={index} className="border-b border-[#b9c4ff]">
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between gap-4 py-4 text-left"
                  aria-expanded={openItems.includes(index)}
                >
                  <span className="text-[1.1rem] font-semibold text-[#3a57b5]">{item.q}</span>
                  <img
                    src="/assets/images/star1.svg"
                    alt=""
                    className={`w-5 h-5 p-1 bg-[#3a57b5] rounded-full transition-transform ${
                      openItems.includes(index) ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                {openItems.includes(index) && (
                  <div className="pb-4">
                    <p className="text-[0.98rem] leading-relaxed text-[#4a4a4a]">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
