"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TbArrowsExchange2 } from "react-icons/tb";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image from "../../public/assets/images/swahi1.png";
import Image from "next/image";
import {
  FaExchangeAlt,
  FaWallet,
  FaBolt,
  FaCreditCard,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";

const services = [
  {
    icon: FaExchangeAlt,
    title: (
      <>
        Instant crypto{" "}
        <TbArrowsExchange2 className="inline-block text-[1.25rem] align-[-0.15em]" />{" "}
        fiat exchange
      </>
    ),
    description:
      "Swap crypto to crypto or crypto to euros at Tier-1 exchange rates, with access to over 100 trading pairs - all in one seamless platform.",
    label: "exchange",
  },
  {
    icon: FaWallet,
    title: "Crypto wallet and personal IBAN",
    description:
      "Securely store crypto and manage your euro funds with a personal IBAN - all from a single, intuitive interface. Supports major cryptocurrencies (BTC, ETH, USDC, etc.) and EUR transactions, from deposits to payments.",
    label: "crypto & iban",
  },
  {
    icon: FaBolt,
    title: "Simple deposits and withdrawals",
    description:
      "Top up your wallet, exchange crypto to euros, and withdraw directly to your IBAN. SEPA/SEPA Instant transfers are fully integrated for smooth transactions.",
    label: "instant transfer",
  },
  {
    icon: FaCreditCard,
    title: "Virtual cards with auto-conversion",
    description:
      "Issue virtual cards linked to your crypto accounts. Spend fiat or crypto online and offline via your phone, with automatic conversion at checkout.",
    label: "virtual cards",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
    );
  }, [activeIndex]);

  const activeService = services[activeIndex];
  return (
    <section
      ref={sectionRef}
      className="bg-[#3c56ab]  relative  z-50 text-white py-28 max-[900px]:py-20"
    >
      <div className="container mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-center font-semibold leading-[1.1] text-5xl mb-12 max-[768px]:text-2xl"
        >
          <span className="block">Manage your fiat and crypto</span>
          <span className="block">-all in one app</span>
        </h2>

        <div className="flex justify-center mb-11 relative">
          <div
            ref={cardRef}
            className="relative w-full max-w-[54rem] min-w-[53rem] bg-[#3d57b0] border border-white/20 lg:rounded-[14px] md:rounded-[14px] px-7 py-6 max-[900px]:min-w-0 max-[900px]:max-w-full max-[768px]:px-5 max-[768px]:py-5"
          >
            <div className="flex items-start gap-10 max-[900px]:flex-col max-[900px]:gap-0">
              {/* Left side: Badge and Text */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 lg:px-4 md:px-4 px-3 py-1 rounded-full border border-white/45 text-[0.9rem] lowercase">
                  <span className="w-2 h-2 rounded-full bg-[#ffefac]" />
                  services
                </div>

                <div className="mt-24 hidden md:block lg:block">
                  <h3 className="text-[1.7rem] font-semibold text-[#ffefac] mb-3">
                    {activeService.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-base">
                    {activeService.description}
                  </p>
                </div>
              </div>

              {/* Right side: Image */}
              <div className="relative w-75  lg:w-75 h-75 lg:h-75 shrink-0 max-[900px]:w-full max-[900px]:h-[270px]">
                <Image
                  src={image}
                  alt="Swahi"
                  fill
                  className="height-full w-auto object-right"
                  priority
                />
              </div>
              <div className=" block lg:hidden  md:hidden">
                <h3 className="text-[1rem] font-semibold text-[#ffefac] mb-3">
                  {activeService.title}
                </h3>
                <p className="text-white/80 leading-relaxed text-base">
                  {activeService.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 max-[900px]:flex-col ">
          <div className="flex items-center gap-4 flex-wrap">
            {services.map((service, index) => (
              <button
                key={service.label}
                type="button"
                className={`inline-flex items-center gap-2 uppercase text-[0.95rem] ${
                  activeIndex === index ? "text-white" : "text-white/70"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <span
                  className={`w-8 h-8 rounded-md border flex items-center justify-center text-[0.95rem] ${
                    activeIndex === index
                      ? "border-white bg-white/20"
                      : "border-white/60 bg-transparent"
                  }`}
                >
                  {index + 1}
                </span>
                {activeIndex === index && (
                  <span className="text-[0.9rem] tracking-[0.02em]">
                    {service.label}
                  </span>
                )}
              </button>
            ))}
          </div>

         <div className="flex flex-wrap gap-2">
                       <button className="relative border border-white/70 rounded-1 px-2 py-1 pl-6 bg-transparent text-white font-semibold text-[0.7rem] leading-[1.1] flex flex-col items-start">
                         <span className="absolute left-[4px] top-1/2 -translate-y-1/2 text-[1.15rem] opacity-95">
                           <FaApple />
                         </span>
                         <span className="text-[0.5rem] font-medium opacity-80">
                           Download on the
                         </span>
                         App Store
                       </button>
                       <button className="relative border border-white/70 rounded-1 px-2 py-1 pl-6 bg-transparent text-white font-semibold text-[0.7rem] leading-[1.1] flex flex-col items-start">
                         <span className="absolute left-[4px] top-1/2 -translate-y-1/2 text-[1.15rem] opacity-95">
                           <FaGooglePlay />
                         </span>
                         <span className="text-[0.5rem] font-medium opacity-80">
                           Get it on
                         </span>
                         Google Play
                       </button>
                     </div>
        </div>
      </div>
    </section>
  );
}
