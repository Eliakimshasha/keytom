"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const features: Array<{ number: string; title: string; description: string }> =
  [
    {
      number: "1",
      title: "Easy & fully online",
      description:
        "Set up your Keytom card in a few simple steps -- fully online, no office visits required.",
    },
    {
      number: "2",
      title: "Pay online or in-store",
      description:
        "Use your card for online purchases or in-store payments at over 130 million locations.",
    },
    {
      number: "3",
      title: "Top up using digital assets",
      description:
        "Convert selected digital assets into funds through Keytom to easily load your card balance.",
    },
    {
      number: "4",
      title: "Contactless payments",
      description:
        "Tap to pay at stores, cafes, and more -- secure, quick, and hassle-free.",
    },
    {
      number: "5",
      title: "ATM access",
      description:
        "Withdraw cash at supported ATMs, with easy access to your funds whenever you need them.",
    },
  ];

export default function VirtualCard() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardStackRef = useRef<HTMLDivElement | null>(null);
  const cardFlipRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      if (!sectionRef.current || !featuresRef.current) return;

      // Title animation
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
          x: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Card stack initial animation
      if (cardStackRef.current) {
        gsap.from(cardStackRef.current, {
          scrollTrigger: {
            trigger: cardStackRef.current,
            start: "top 70%",
          },
          scale: 0.9,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }

      const items = gsap.utils.toArray<HTMLElement>(
        ".vc-item",
        featuresRef.current,
      );

      mm.add("(min-width: 901px)", () => {
        const itemStep = 1;
        const itemInDuration = 0.6;
        const descInDuration = 0.4;
        const totalDuration = (items.length - 1) * itemStep + itemInDuration;
        const stepPx = 420;
        const scrollDistance = totalDuration * stepPx;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
          },
        });

        if (cardFlipRef.current) {
          timeline.to(
            cardFlipRef.current,
            {
              rotateY: 360,
              ease: "none",
              duration: totalDuration,
            },
            0,
          );
        }

        gsap.set(items, { opacity: 0, y: 300 });

        items.forEach((item, index) => {
          const desc = item.querySelector<HTMLElement>(".vc-desc");
          const startAt = index * itemStep;

          timeline.to(
            item,
            {
              opacity: 1,
              y: 0,
              duration: itemInDuration,
              ease: "power3.out",
            },
            startAt,
          );

          if (desc) {
            const descHeight = desc.scrollHeight;
            gsap.set(desc, {
              height: 0,
              opacity: 0,
              marginTop: 0,
              overflow: "hidden",
            });

            timeline.to(
              desc,
              {
                height: descHeight,
                opacity: 1,
                marginTop: 8,
                duration: descInDuration,
                ease: "power2.out",
              },
              startAt + 0.1,
            );

            if (index > 0) {
              const prevDesc =
                items[index - 1]?.querySelector<HTMLElement>(".vc-desc");
              if (prevDesc) {
                timeline.to(
                  prevDesc,
                  {
                    height: 0,
                    opacity: 0,
                    marginTop: 0,
                    duration: 0.3,
                    ease: "power2.out",
                  },
                  startAt,
                );
              }
            }
          }
        });
      });

      mm.add("(max-width: 900px)", () => {
        items.forEach((item, index) => {
          const desc = item.querySelector<HTMLElement>(".vc-desc");

          gsap.set(item, { opacity: 1, y: 0 });
          if (desc) {
            gsap.set(desc, { height: "auto", opacity: 1 });
          }

          // Stagger animation on mobile - each item comes one by one from bottom
          gsap.from(item, {
            y: 100,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.2, // 200ms delay between each item
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            },
          });
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className=" py-28 min-h-screen max-[900px]:py-20">
      <div className="container mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-[#3a57b5] font-semibold text-[clamp(2.6rem,4.6vw,4.8rem)] mb-8"
        >
          Keytom Virtual
        </h2>

        <div className="grid grid-cols-[1.05fr_1fr] gap-12 items-start max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <div className="flex items-center justify-center min-h-[420px] sticky top-20 max-[900px]:static max-[900px]:min-h-[260px] max-[900px]:mb-4">
            <div
              ref={cardStackRef}
              className="relative w-[min(90%,460px)] h-[320px] max-[900px]:w-[min(100%,340px)] max-[900px]:h-[240px]"
              style={{ perspective: "1000px" }}
            >
              <div
                ref={cardFlipRef}
                className="relative w-full bg-red-900 lg:h-full md:h-full h-fit"
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                <img
                  src="/assets/images/card1.jpeg"
                  alt="Keytom card front"
                  className="w-full lg:min-w-[460px] rounded-[18px]  absolute lg:-top-9 lg:-left-9 md:-top-9 md:-left-9"
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                />
                <img
                  src="/assets/images/card2.jpeg"
                  alt="Keytom card back"
                  className="w-full lg:min-w-[460px] rounded-[18px]  absolute lg:-top-9 lg:-left-9 md:-top-9 md:-left-9"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                />
              </div>
            </div>
          </div>

          <div
            ref={featuresRef}
            className="overflow-hidden relative max-[900px]:overflow-visible"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="vc-item py-4 border-b border-[#b9c3ff95] last:border-b-0"
              >
                <div className="vc-header flex items-center gap-4">
                  <div className="inline-flex items-center gap-2 lg:px-4 px-3 lg:py-1 py-[2px] rounded-full border border-[#b9c4ff] text-[#3a57b5] font-semibold text-[0.95rem] lg:min-w-[56px] justify-center">
                    <span className="lg:w-2 lg:h-2 w-1 h-1 rounded-full bg-[#3a57b5]" />
                    <span>{feature.number}</span>
                  </div>
                  <h3 className="text-[1.4rem] font-semibold text-[#3a57b5]">
                    {feature.title}
                  </h3>
                </div>

                <p className="vc-desc lg:ml-[72px] ml-[60px] mt-2 lg:text-[0.98rem] text-[0.8rem] leading-snug text-[#4b5fc0]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
