"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaChevronDown, FaArrowRight } from "react-icons/fa";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import { PiTelegramLogoFill } from "react-icons/pi";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";


export default function Footer() {
  const footerRef = useRef(null);

  useGSAP(() => {
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
  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      data-nav-theme="light"
      className="bg-[#3c56ab] text-white py-7 pb-10 max-[900px]:pt-0"
    >
      <div className=" mx-auto lg:px-16 px-6">
        {/* here should go the footer 1 */}
        <div className="pt-6">
          <div className="grid grid-cols-4 gap-16 max-[900px]:gap-7 text-white max-[900px]:grid-cols-1 max-[600px]:grid-cols-1">
            <div className="space-y-4 max-[900px]:space-y-0">
              <div className="flex items-center gap-2 text-[#f6e2a3] font-semibold uppercase text-[0.95rem] tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#f6e2a3]" />
                Discover
              </div>
              <ul className="space-y-3 max-[900px]:text-[0.8rem] max-[900px]:text-[0.8rem] text-[1rem] max-[900px]:space-y-1">
                <li>Personal</li>
                <li>Business</li>
                <li>Cards</li>
                <li>FAQ</li>
              </ul>
            </div>

            <div className="space-y-4 max-[900px]:space-y-0">
              <div className="flex items-center gap-2 text-[#f6e2a3] font-semibold uppercase text-[0.95rem] tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#f6e2a3]" />
                Legal
              </div>
              <ul className="space-y-3 max-[900px]:text-[0.8rem] text-[1rem] max-[900px]:space-y-1">
                <li>Terms and Conditions</li>
                <li>AML Policy</li>
                <li>Privacy Policy</li>
             
              </ul>
            </div>

            <div className="space-y-4 max-[900px]:space-y-0">
              <div className="flex items-center gap-2 text-[#f6e2a3] font-semibold uppercase text-[0.95rem] tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#f6e2a3]" />
                Company
              </div>
              <ul className="space-y-3 max-[900px]:text-[0.8rem] text-[1rem] max-[900px]:space-y-1">
                <li>Blog</li>
              </ul>
            </div>

            <div className="space-y-4 max-[900px]:space-y-0">
              <div className="flex items-center gap-2 text-[#f6e2a3] font-semibold uppercase text-[0.95rem] tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#f6e2a3]" />
                Contact
              </div>
              <ul className="space-y-3 max-[900px]:text-[0.8rem] text-[1rem] max-[900px]:space-y-1">
                <li>Email</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between gap-6">
            <div className="flex gap-2 max-[900px]:mb-3">
              <button className="relative border border-white/70 rounded-1 px-2 py-1 pl-6 bg-transparent text-white font-semibold text-[0.7rem] max-[900px]:text-[0.4rem] leading-[1.1] flex flex-col items-start">
                <span className="absolute left-[4px] top-1/2 -translate-y-1/2 lg:text-[1.15rem] md:text-[1.15rem] text-[0.8rem] opacity-95">
                  <FaApple />
                </span>
                <span className="text-[0.5rem] font-medium opacity-80">
                  Download on the
                </span>
                App Store
              </button>
              <button className="relative border border-white/70 rounded-1 px-2 py-1 pl-6 bg-transparent text-white font-semibold text-[0.7rem] max-[900px]:text-[0.4rem] leading-[1.1] flex flex-col items-start">
                <span className="absolute left-1 top-1/2 -translate-y-1/2 lg:text-[1.15rem] md:text-[1.15rem] text-[0.8rem] opacity-95">
                  <FaGooglePlay />
                </span>
                <span className="text-[0.5rem] font-medium opacity-80">
                  Get it on
                </span>
                Google Play
              </button>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-9 h-9 max-[900px]:w-5 max-[900px]:h-5 rounded-xs border border-white/70 flex items-center justify-center text-[1.1rem] max-[900px]:text-[0.7rem] ">
                <FaLinkedinIn />
              </span>
              <span className="w-9 h-9 max-[900px]:w-5 max-[900px]:h-5 rounded-xs border border-white/70 flex items-center justify-center text-[1.1rem] max-[900px]:text-[0.7rem] ">
                <PiTelegramLogoFill />
              </span>
              <span className="w-9 h-9 max-[900px]:w-5 max-[900px]:h-5 rounded-xs border border-white/70 flex items-center justify-center text-[1.1rem] max-[900px]:text-[0.7rem] ">
                <FaXTwitter />
              </span>
              <span className="w-9 h-9 max-[900px]:w-5 max-[900px]:h-5 rounded-xs border border-white/70 flex items-center justify-center text-[1.1rem] max-[900px]:text-[0.7rem] ">
                <FaInstagram />
              </span>
            </div>
          </div>
        </div>

        {/* this is the second footer  */}
        <div className="flex items-center justify-between gap-6 pt-6 relative border-t border-white/35 flex-wrap max-[900px]:flex-col max-[900px]:items-start">
          <img
            src="/assets/images/star1.svg"
            alt=""
            className="w-[18px] absolute right-24 -top-[9px] h-[18px]"
          />

          <div className="flex items-center gap-3">
            <button className="inline-flex max-[900px]:text-[0.7rem] items-center gap-2 bg-white text-[#3c56ab] px-4 py-2 rounded-xs font-semibold text-[0.95rem]">
              EN
              <FaChevronDown className="text-[0.8rem] max-[900px]:text-[0.6rem]" />
            </button>
            <button
              className="w-9 h-9 max-[900px]:w-7 max-[900px]:h-8 rounded-xs border-1 border-white text-white max-[900px]:text-[0.7rem] flex items-center justify-center"
              aria-label="Next"
            >
              <MdOutlineLogout />
            </button>
            <button className="bg-[#f6e2a3] text-[#3c56ab] px-4 py-2 rounded-xs font-bold text-[0.95rem] max-[900px]:text-[0.7rem] uppercase">
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
          {/* <p>
            Cryptocurrency and digital asset services are provided by KEYTOM
            SERVICES LTD (hereinafter "KEYTOM"), registered in Canada as a Money
            Services Business with the Financial Transactions and Reports
            Analysis Centre of Canada (FINTRAC) under MSB registration number
            M21788474 and operating in accordance with the Proceeds of Crime
            (Money Laundering) and Terrorist Financing Act (PCMLTFA).
          </p> */}
          {/* <p>
            Cryptocurrencies and digital assets are highly volatile financial
            instruments and involve a significant risk of partial or total loss
            of funds. KEYTOM does not provide investment, financial, tax, or
            legal advice. Clients remain solely responsible for conducting their
            own due diligence and complying with applicable laws in their
            jurisdiction.
          </p> */}
          {/* <p>
            Services may not be available in all jurisdictions and may be
            restricted based on regulatory, compliance, or sanctions
            requirements. KEYTOM reserves the right to request verification
            information or restrict services where required by law.
          </p> */}
          {/* <p>
            KEYTOM operates exclusively through keytom.com and authorized
            communication channels. KEYTOM is not responsible for activities
            conducted through unauthorized or impersonating websites or third
            parties.
          </p> */}
          {/* <p>
            By using KEYTOM services, clients acknowledge and accept the risks
            associated with digital asset transactions and agree to comply with
            KEYTOM's Terms and Conditions and applicable legal requirements.
          </p> */}
        </div>
      </div>
    </footer>
  );
}
