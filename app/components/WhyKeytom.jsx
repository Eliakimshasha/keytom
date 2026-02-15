"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function WhyKeytom() {
  const titleRef = useRef(null);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardOneRef = useRef(null);
  const cardTwoRef = useRef(null);
  const cardThreeRef = useRef(null);
  const cardFourRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set(titleRef.current, { opacity: "1" });
        gsap.set(
          [
            cardOneRef.current,
            cardTwoRef.current,
            cardThreeRef.current,
            cardFourRef.current,
          ],
          { bottom: "-120px", top: "auto" },
        );

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=1000",
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });

        timeline.to(
          cardOneRef.current,
          {
            top: "-80px",
            duration: 2,
          },
          "-=1",
        );

        timeline.to(
          titleRef.current,
          {
            opacity: "0",
            duration: 7,
          },
          "-=1",
        );
        timeline.to(
          cardTwoRef.current,
          {
            top: "-80px",
            duration: 2,
          },
          "-=7",
        );

        timeline.to(
          cardThreeRef.current,
          {
            top: "-80px",
            duration: 2,
          },
          "-=6",
        );

        timeline.to(
          cardFourRef.current,
          {
            top: "-80px",
            duration: 2,
          },
          "-=5",
        );

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      mm.add("(max-width: 767px)", () => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        gsap.set(titleRef.current, { opacity: "1" });
        gsap.set(
          [
            cardOneRef.current,
            cardTwoRef.current,
            cardThreeRef.current,
            cardFourRef.current,
          ],
          { clearProps: "top,bottom" },
        );

        const slider = track.parentElement;
        if (!slider) return;

        const getScrollAmount = () => {
          const amount = track.scrollWidth - slider.clientWidth +20;
          return Math.max(0, amount);
        };

        if (getScrollAmount() <= 0) return;

        const moveTween = gsap.to(track, {
          x: () => `-${getScrollAmount()}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollAmount()}px`,
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const handleLoad = () => ScrollTrigger.refresh();

        const resizeObserver = new ResizeObserver(() => {
          ScrollTrigger.refresh();
        });

        resizeObserver.observe(track);
        resizeObserver.observe(slider);

        if (document.readyState === "complete") {
          handleLoad();
        } else {
          window.addEventListener("load", handleLoad);
        }

        return () => {
          window.removeEventListener("load", handleLoad);
          resizeObserver.disconnect();
          moveTween.scrollTrigger?.kill();
          moveTween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:min-h-[110vh] bg-[linear-gradient(100deg,#f3e6c9_0%,#efd7c7_45%,#d6a6bf_100%)] max-[767px]:min-h-[100vh] max-[767px]:pt-36 max-[767px]:pb-0"
    >
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/assets/images/star1.svg"
          alt=""
          className="absolute w-5 h-5 opacity-60 left-[1%] top-[30%]"
        />
      
       
        <img
          src="/assets/images/star1.svg"
          alt=""
          className="absolute w-5 h-5 opacity-60 right-[1%] top-[30%]"
        />
      </div>

      <div
        ref={titleRef}
        className="text-center text-[clamp(3rem,11vw,10rem)] font-semibold tracking-[-0.02em] text-white/35 max-[900px]:text-white/60 max-[900px]:text-4xl pointer-events-none select-none"
      >
        Why Keytom?
      </div>

      <div className="mx-auto w-full z-50">
        <div className="max-[767px]:overflow-hidden">
          <div className="left-1/2 -translate-x-1/2 w-full md:absolute max-w-[1200px] mx-auto max-[767px]:static max-[767px]:translate-x-0 max-[767px]:mt-8">
            <div className="max-[767px]:overflow-hidden md:block">
              <div
                ref={trackRef}
                className="relative max-[767px]:flex max-[767px]:flex-row max-[767px]:flex-nowrap max-[767px]:gap-4 max-[767px]:pr-3 max-[767px]:pl-3 md:min-h-[520px] lg:min-h-[560px]"
              >
                <div
                  ref={cardOneRef}
                  className="reason-card md:absolute md:left-0  lg:left-4  bg-[rgba(253,249,242,0.9)] border border-white/70 rounded-[3px] p-6 min-h-[320px]  max-h-[400px] flex flex-col gap-4 shadow-[0_20px_50px_rgba(159,118,129,0.2)] max-[767px]:flex-none max-[767px]:w-[76vw] sm:max-[767px]:w-[60vw] md:w-[260px] lg:w-[280px]"
                >
                  <div>
                    <h3 className="text-[30px] font-bold text-[#b07f8d] leading-none mb-1">
                      126+
                    </h3>
                    <p className="text-[1.1rem] font-semibold text-[#b07f8d]">
                      countries supported
                    </p>
                  </div>

                  <p className="text-[0.9rem] leading-[1.5] text-[rgba(176,127,141,0.85)] mt-auto">
                    We onboard users from 126+ countries, whether you hold a
                    passport or a residence permit we've got you covered.
                  </p>
                </div>

                <div
                  ref={cardTwoRef}
                  className="reason-card md:absolute md:left-[25%]  lg:left-[26%]  bg-[rgba(253,249,242,0.9)] border border-white/70 rounded-[3px] p-6 min-h-[320px]  max-h-[400px] flex flex-col gap-4 shadow-[0_20px_50px_rgba(159,118,129,0.2)] max-[767px]:flex-none max-[767px]:w-[76vw] sm:max-[767px]:w-[60vw] md:w-[260px] lg:w-[280px]"
                >
                  <div>
                    <h3 className="text-[30px] font-bold text-[#b07f8d] leading-none mb-1">
                      Low service
                    </h3>
                    <p className="text-[1.1rem] font-semibold text-[#b07f8d]">
                      fees
                    </p>
                  </div>

                  <p className="text-[0.9rem] leading-[1.5] text-[rgba(176,127,141,0.85)] mt-auto">
                    Beneficial rates for exchanges and transfers, with full
                    transparency and no hidden charges.
                  </p>

                  <div className="flex flex-col gap-1">
                    <a
                      href="#"
                      className="text-[0.9rem] font-semibold text-[rgba(176,127,141,0.9)] underline underline-offset-4"
                    >
                      Fees for individuals
                    </a>
                    <a
                      href="#"
                      className="text-[0.9rem] font-semibold text-[rgba(176,127,141,0.9)] underline underline-offset-4"
                    >
                      Fees for businesses
                    </a>
                  </div>
                </div>

                <div
                  ref={cardThreeRef}
                  className="reason-card md:absolute md:right-[25%]  lg:right-[26%]  bg-[rgba(253,249,242,0.9)] border border-white/70 rounded-[3px] p-6 min-h-[320px]  max-h-[400px] flex flex-col gap-4 shadow-[0_20px_50px_rgba(159,118,129,0.2)] max-[767px]:flex-none max-[767px]:w-[76vw] sm:max-[767px]:w-[60vw] md:w-[260px] lg:w-[280px]"
                >
                  <div>
                    <h3 className="text-[30px] font-bold text-[#b07f8d] leading-none mb-1">
                      100% online
                    </h3>
                    <p className="text-[1.1rem] font-semibold text-[#b07f8d]">
                      account opening
                    </p>
                  </div>

                  <p className="text-[0.9rem] leading-[1.5] text-[rgba(176,127,141,0.85)] mt-auto">
                    Sign up and open your account completely remote. All you
                    need is your phone or computer. No trips to the office, no
                    lines, no delays.
                  </p>
                </div>

                <div
                  ref={cardFourRef}
                  className="reason-card md:absolute md:right-0  lg:right-4  bg-[rgba(253,249,242,0.9)] border border-white/70 rounded-[3px] p-6 min-h-[320px]  max-h-[400px] flex flex-col gap-4 shadow-[0_20px_50px_rgba(159,118,129,0.2)] max-[767px]:flex-none max-[767px]:w-[76vw] sm:max-[767px]:w-[60vw] md:w-[260px] lg:w-[280px]"
                >
                  <div>
                    <h3 className="text-[30px] font-bold text-[#b07f8d] leading-none mb-1">
                      Trusted
                    </h3>
                    <p className="text-[1.1rem] font-semibold text-[#b07f8d]">
                      security
                    </p>
                  </div>

                  <p className="text-[0.9rem] leading-[1.5] text-[rgba(176,127,141,0.85)] mt-auto">
                    Advanced protection with $100M crypto insurance and secure
                    infrastructure. Your assets stay safe from threats and
                    unauthorized access.
                  </p>

                  <a
                    href="#"
                    className="text-[0.9rem] font-semibold text-[rgba(176,127,141,0.9)] underline underline-offset-4"
                  >
                    Learn more?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
