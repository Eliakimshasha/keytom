"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

import { Select } from "antd";

const languageOptions = [
  { label: "EN", value: "en" },
  { label: "FR", value: "fr" },
  { label: "ES", value: "es" },
];

export default function NavBar() {
  const headerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState(languageOptions[0].value);

  useEffect(() => {
    // Handle scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    const headerEl = headerRef.current;
    let tween;

    if (headerEl) {
      // Keep header visible even if GSAP doesn't run
      gsap.set(headerEl, { opacity: 1 });

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!prefersReducedMotion) {
        tween = gsap.from(headerEl, {
          y: -60,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
          clearProps: "transform",
        });
      }
    }

    return () => {
      if (tween) {
        tween.kill();
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = ["PERSONAL", "BUSINESS", "CARDS", "FAQ"];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 `}
    >
      <nav className=" mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-[#38488B] 
  rounded-full px-7 py-1 tracking-tight
  bg-white/10 backdrop-blur-md
 "
        >
          keytom
        </div>

        {/* Desktop Navigation */}
        <div
          className="hidden rounded-full px-7 py-3 tracking-tight 
   md:flex items-center space-x-2 dg"
        >
          {navItems.map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm hover:text-gray-700 bg-white/10 rounded-xs px-4 py-2 backdrop-blur-md   text-[#38488B] transition-colors duration-200 font-medium tracking-wide"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Select
            value={language}
            onChange={setLanguage}
            aria-label="Language"
            style={{ width: 120, background: "transparent" }}
            options={languageOptions}
          />
          <button className="px-6 py-2 bg-[#38488B] text-white rounded-md font-medium text-sm hover:bg-opacity-90 transition-all duration-200 hover:scale-105">
            OPEN ACCOUNT
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-gray-700 hover:text-[#38488B] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="px-6 py-2 bg-[#38488B] text-white rounded-md font-medium text-sm w-full">
              OPEN ACCOUNT
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
