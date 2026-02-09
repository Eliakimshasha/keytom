"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronDown, FaArrowRight } from "react-icons/fa";

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#3c56ab] text-white py-7 pb-10 max-[900px]:py-6"
    >
      <div className="container mx-auto px-6">
        {/* here should go the footer 1 */}
        <div className="flex items-center justify-between gap-6 pt-6 ">
        
        </div>

        {/* this is the second footer  */}
        <div className="flex items-center justify-between gap-6 pt-6 relative border-t border-white/35 flex-wrap max-[900px]:flex-col max-[900px]:items-start">
          <img
            src="/assets/images/star1.svg"
            alt=""
            className="w-[18px] absolute right-24 -top-[9px] h-[18px]"
          />

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-white text-[#3c56ab] px-4 py-2 rounded-xs font-semibold text-[0.95rem]">
              EN
              <FaChevronDown className="text-[0.8rem]" />
            </button>
            <button
              className="w-9 h-9 rounded-xs border-2 border-white text-white flex items-center justify-center"
              aria-label="Next"
            >
              <FaArrowRight />
            </button>
            <button className="bg-[#f6e2a3] text-[#3c56ab] px-4 py-2 rounded-xs font-bold text-[0.95rem] uppercase">
              Open account
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-[0.95rem]">
              © Keytom Ltd 2026
            </span>
          </div>
        </div>

        <div className="mt-5 text-white/80 text-[0.9rem] leading-relaxed space-y-4 max-[900px]:text-[0.85rem]">
          <p>
            Not all products and services are available in all geographic areas
            and remain subject to applicable laws, regulatory requirements, and
            internal compliance policies.
          </p>
          <p>
            Cryptocurrency and digital asset services are provided by KEYTOM
            SERVICES LTD (hereinafter "KEYTOM"), registered in Canada as a Money
            Services Business with the Financial Transactions and Reports
            Analysis Centre of Canada (FINTRAC) under MSB registration number
            M21788474 and operating in accordance with the Proceeds of Crime
            (Money Laundering) and Terrorist Financing Act (PCMLTFA).
          </p>
          <p>
            Cryptocurrencies and digital assets are highly volatile financial
            instruments and involve a significant risk of partial or total loss
            of funds. KEYTOM does not provide investment, financial, tax, or
            legal advice. Clients remain solely responsible for conducting their
            own due diligence and complying with applicable laws in their
            jurisdiction.
          </p>
          <p>
            Services may not be available in all jurisdictions and may be
            restricted based on regulatory, compliance, or sanctions
            requirements. KEYTOM reserves the right to request verification
            information or restrict services where required by law.
          </p>
          <p>
            KEYTOM operates exclusively through keytom.com and authorized
            communication channels. KEYTOM is not responsible for activities
            conducted through unauthorized or impersonating websites or third
            parties.
          </p>
          <p>
            By using KEYTOM services, clients acknowledge and accept the risks
            associated with digital asset transactions and agree to comply with
            KEYTOM's Terms and Conditions and applicable legal requirements.
          </p>
        </div>
      </div>
    </footer>
  );
}
