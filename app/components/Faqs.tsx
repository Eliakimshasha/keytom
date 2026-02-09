"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type FAQItem = { q: string; a: string };
type FAQSections = Record<string, FAQItem[]>;
type FAQData = { individuals: FAQSections; businesses?: FAQSections };

const faqData: FAQData = {
  individuals: {
    "Getting Started": [
      {
        q: "Can I open an account if I'm not from the EU?",
        a: "Yes, we support customers from 120+ countries, the full list is here. Our tool is available to help you understand our capabilities for your case.",
      },
      {
        q: "I have a residence permit, will it work?",
        a: "Yes, the residence permit works for us, your nationality can be any as long as the residence permit is in the accepted countries list.",
      },
      {
        q: "Can I receive salary payments to the account?",
        a: "Yes, we support any third party payments to your account, you can receive and send funds from and to both businesses and individuals.",
      },
      {
        q: "How long does it take to have a fully operational account?",
        a: "It takes about an hour to provide you with IBAN and Card. Crypto is available within minutes.",
      },
    ],
    "Crypto & Fiat": [
      {
        q: "What crypto currencies can I have?",
        a: "We provide access to 10+ crypto currencies, which include the standard ones: ETH, BTC, USDC and more exotic: XRP, LTC, SOL.",
      },
      {
        q: "For the exchange do I have to visit another app?",
        a: "No, all the operations -- including exchanges -- are available in a single Keytom app. You can use it on your phone via the web version or by downloading it from the App Store or Google Play.",
      },
    ],
    Cards: [
      {
        q: "How am I topping up the card?",
        a: "You can load your account with USDC or exchange your Euro to USDC to top up your card account. As long as you have USDC you have the capabilities to use the card.",
      },
      {
        q: "Is the card virtual or physical?",
        a: "At the moment the card is virtual, however you can use Apple Pay or Google Pay for offline and online purchases.",
      },
    ],
    "Security & Privacy": [
      {
        q: "Are you licensed?",
        a: "Yes: Cryptocurrency and fiat services are provided legally by Money Services Business KEYTOM SERVICES LTD under the MSB FINTRAC licence, registered in Canada.",
      },
      {
        q: "How are my funds protected?",
        a: "Client crypto assets are insured up to $100M through institutional-grade coverage. Fiat funds are fully safeguarded in segregated accounts.",
      },
    ],
  },
};

export default function FAQ() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = useState<"individuals" | "businesses">(
    "individuals",
  );
  const [activeCategory, setActiveCategory] =
    useState<string>("Getting Started");
  const [openItems, setOpenItems] = useState<number[]>([]);
  const activeData = (faqData[activeTab] ?? faqData.individuals) as FAQSections;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const categories = Object.keys(activeData);
    if (!categories.includes(activeCategory)) {
      setActiveCategory(categories[0]);
      setOpenItems([]);
    }
  }, [activeTab, activeCategory, activeData]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const categories = Object.keys(activeData);
  const currentQuestions = activeData[activeCategory] || [];

  return (
    <section ref={sectionRef} data-nav-theme="light" className="bg-[#3c56ab] py-24 max-[900px]:py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-start gap-20 max-[900px]:flex-col max-[900px]:gap-12">
          <div className="w-[260px] max-[900px]:w-full">
            <h1 className="text-[3.5rem] leading-none text-white font-semibold">
              FAQ
            </h1>
            <div className="flex flex-col max-[900px]:grid grid-cols gap-2 pt-6">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center gap-3 w-fit px-5 py-2 text-left text-[1.05rem] font-semibold transition-colors ${
                    activeCategory === category
                      ? "border border-white/80 rounded-full text-white"
                      : "text-white/50"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activeCategory === category ? "bg-white" : "bg-white/30"
                    }`}
                  />
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 max-[900px]:justify-start">
              <button
                type="button"
                onClick={() => setActiveTab("individuals")}
                className={`inline-flex items-center gap-2 px-6 py-2 rounded-full border text-[1.05rem] font-semibold ${
                  activeTab === "individuals"
                    ? "bg-white text-[#3c56ab] border-white"
                    : "bg-transparent text-white/80 border-white/60"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    activeTab === "individuals"
                      ? "bg-[#3c56ab]"
                      : "bg-white/80"
                  }`}
                />
                Individuals
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("businesses")}
                className={`inline-flex items-center gap-2 px-6 py-2 rounded-full border text-[1.05rem] font-semibold ${
                  activeTab === "businesses"
                    ? "bg-white text-[#3c56ab] border-white"
                    : "bg-transparent text-white/80 border-white/60"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    activeTab === "businesses"
                      ? "bg-[#3c56ab]"
                      : "bg-white/80"
                  }`}
                />
                Businesses
              </button>
            </div>

            <div className="mt-6 border-t border-white/20">
              {currentQuestions.map((item, index) => (
                <div key={index} className="border-b border-white/20">
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={openItems.includes(index)}
                  >
                    <span className="text-[1.25rem] font-semibold text-white">
                      {item.q}
                    </span>
                    <span
                      className={`relative w-9 h-9 rounded-md border border-white/35 flex items-center justify-center transition-transform ${
                        openItems.includes(index) ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <span className="absolute w-4 h-[2px] bg-white/90" />
                      <span className="absolute h-4 w-[2px] bg-white/90" />
                    </span>
                  </button>
                  {openItems.includes(index) && (
                    <div className="pb-5">
                      <p className="text-[0.98rem] leading-relaxed text-white/70">
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
