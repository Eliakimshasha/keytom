'use client'

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Reason {
  stat: string;
  label: string;
  description: string;
  links?: string[];
  link?: string;
}

const reasons: Reason[] = [
  {
    stat: '126+',
    label: 'countries supported',
    description:
      "We onboard users from 126+ countries, whether you hold a passport or a residence permit we've got you covered."
  },
  {
    stat: 'Low service',
    label: 'fees',
    description:
      'Beneficial rates for exchanges and transfers, with full transparency and no hidden charges.',
    links: ['Fees for individuals', 'Fees for businesses']
  },
  {
    stat: '100% online',
    label: 'account opening',
    description:
      'Sign up and open your account completely remote. All you need is your phone or computer. No trips to the office, no lines, no delays.'
  },
  {
    stat: 'Trusted',
    label: 'security',
    description:
      'Advanced protection with $100M crypto insurance and secure infrastructure. Your assets stay safe from threats and unauthorized access.',
    link: 'Learn more?'
  }
]

export default function WhyKeytom() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const slider = track.parentElement;

        const getScrollAmount = () => {
          const lastCard = track.lastElementChild;
          if (!lastCard || !slider) return 0;

          const currentX = gsap.getProperty(track, "x") as number;
          gsap.set(track, { x: 0 });

          const sliderRect = slider.getBoundingClientRect();
          const lastCardRect = lastCard.getBoundingClientRect();

          const base = Math.max(0, lastCardRect.right - sliderRect.right);
          const tail = Math.max(16, sliderRect.width * 0.1);
          const amount = base + tail;

          gsap.set(track, { x: currentX });
          return amount;
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
        if (slider) resizeObserver.observe(slider);

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

      mm.add("(min-width: 768px)", () => {
        const section = sectionRef.current;
        const title = titleRef.current;
        if (!section || !title) return;

        const cards = gsap.utils.toArray<HTMLElement>(".reason-card", section);
        if (!cards.length) return;

        const getScrollDistance = () =>
          Math.max(420, Math.round(window.innerHeight * 0.8));

        const pinTrigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        // Set initial state for all cards
        gsap.set(cards, { y: 400, opacity: 0 });

        const cardsTween = gsap.to(
          cards,
          {
            y: -100,
            opacity: 1,
            ease: "power2.out",
            stagger: 0.2, // Each card starts animating 0.2 of the scroll timeline later
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${getScrollDistance()}`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );

        const titleTween = gsap.fromTo(
          title,
          { opacity: 1 },
          {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${getScrollDistance()}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );

        return () => {
          titleTween.scrollTrigger?.kill();
          titleTween.kill();
          cardsTween.scrollTrigger?.kill();
          cardsTween.kill();
          pinTrigger.kill();
        };
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:min-h-[110vh] bg-[linear-gradient(100deg,#f3e6c9_0%,#efd7c7_45%,#d6a6bf_100%)] max-[767px]:min-h-[100vh] max-[767px]:pt-36 max-[767px]:pb-0"
    >
      <div className="absolute inset-0 pointer-events-none">
        <img src="/assets/images/star1.svg" alt="" className="absolute w-5 h-5 opacity-60 left-[4%] top-[12%]" />
        <img src="/assets/images/star1.svg" alt="" className="absolute w-5 h-5 opacity-60 left-[22%] top-[10%]" />
        <img src="/assets/images/star1.svg" alt="" className="absolute w-5 h-5 opacity-60 left-[48%] top-[14%]" />
        <img src="/assets/images/star1.svg" alt="" className="absolute w-5 h-5 opacity-60 left-[72%] top-[11%]" />
        <img src="/assets/images/star1.svg" alt="" className="absolute w-5 h-5 opacity-60 left-[94%] top-[13%]" />
      </div>

      <div
        ref={titleRef}
        className="text-center text-[clamp(3rem,11vw,10rem)] font-semibold tracking-[-0.02em] text-white/35 pointer-events-none select-none"
      >
        Why Keytom?
      </div>

      <div className="mx-auto w-full z-50">
        <div className="max-[767px]:overflow-hidden">
          <div className="left-1/2 -translate-x-1/2 w-full md:absolute  max-w-[1200px] mx-auto md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 max-[767px]:static max-[767px]:translate-x-0 max-[767px]:mt-8">
            <div className="max-[767px]:overflow-hidden md:contents">
              <div 
                ref={trackRef}
                className="max-[767px]:flex max-[767px]:flex-row max-[767px]:flex-nowrap max-[767px]:gap-4 max-[767px]:pr-3 max-[767px]:pl-3 md:contents"
              >
                {reasons.map((reason, index) => (
                  <div
                    key={index}
                    className="reason-card bg-[rgba(253,249,242,0.9)] border border-white/70 rounded-[3px] p-6 min-h-[320px] flex flex-col gap-4 shadow-[0_20px_50px_rgba(159,118,129,0.2)] max-[767px]:flex-none max-[767px]:w-[76vw] sm:max-[767px]:w-[60vw] md:w-auto"
                  >
                    <div>
                      <h3 className="text-[30px] font-bold text-[#b07f8d] leading-none mb-1">
                        {reason.stat}
                      </h3>
                      <p className="text-[1.1rem] font-semibold text-[#b07f8d]">
                        {reason.label}
                      </p>
                    </div>

                    <p className="text-[0.9rem] leading-[1.5] text-[rgba(176,127,141,0.85)] mt-auto">
                      {reason.description}
                    </p>

                    {reason.links && (
                      <div className="flex flex-col gap-1">
                        {reason.links.map((link, i) => (
                          <a
                            key={i}
                            href="#"
                            className="text-[0.9rem] font-semibold text-[rgba(176,127,141,0.9)] underline underline-offset-4"
                          >
                            {link}
                          </a>
                        ))}
                      </div>
                    )}

                    {reason.link && (
                      <a
                        href="#"
                        className="text-[0.9rem] font-semibold text-[rgba(176,127,141,0.9)] underline underline-offset-4"
                      >
                        {reason.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}