"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../app/components/Navbar";
import Hero from "../app/components/Hero";
import Services from "../app/components/Services";
import VirtualCard from "../app/components/VirtualCard";
import WhyKeytom from "../app/components/WhyKeytom";
import BuiltFor from "../app/components/BuiltFor";
import Comparison from "../app/components/Comparison";
import FAQ from "../app/components/Faqs";
import Footer from "../app/components/Footer";
import Intro from "../app/components/Intro";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroPinRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroPinEl = heroPinRef.current;
    const introEl = introRef.current;

    const mm = gsap.matchMedia();

    if (heroPinEl && introEl) {
      const createHeroPin = () =>
        ScrollTrigger.create({
          trigger: heroPinEl,
          start: "top top",
          endTrigger: introEl,
          end: "bottom top",
          pin: heroPinEl,
          pinSpacing: false,
          anticipatePin: 1,
        });

      mm.add("(min-width: 901px)", () => createHeroPin());
      mm.add("(max-width: 900px)", () => createHeroPin());
    }

    // Initialize GSAP ScrollTrigger
    ScrollTrigger.refresh();

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main ref={mainRef} className="overflow-x-hidden">
      <Header />
      <div className="hero-intro-wrap">
        <div ref={heroPinRef}>
          <Hero />
        </div>
        <div ref={introRef}>
          <Intro />
        </div>
      </div>
      <Services />
      <WhyKeytom />
      <VirtualCard />
      <BuiltFor />
      <Comparison />
      <FAQ />
      <Footer />
    </main>
  );
}
