"use client";

import { useRef } from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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

const features2: Array<{ number: string; title: string; description: string }> =
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

export function CardsContent() {
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const features2Ref = useRef<HTMLDivElement | null>(null);
  const virtualSectionRef = useRef<HTMLDivElement | null>(null);
  const cardFlipRef = useRef<HTMLDivElement | null>(null);
  const topCardRef = useRef<HTMLImageElement | null>(null);
  const topCardContainerRef = useRef<HTMLDivElement | null>(null);
  const shadowCardRef = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLImageElement | null>(null);
  const CardSectionRef = useRef<HTMLDivElement | null>(null);
  const demoCardRef = useRef<HTMLImageElement | null>(null);
  const physicalTitleRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      const ctx = gsap.context(() => {
        if (
          !virtualSectionRef.current ||
          !featuresRef.current ||
          !features2Ref.current ||
          !CardSectionRef.current ||
          !topCardRef.current ||
          !topCardContainerRef.current
        ) {
          return;
        }

        gsap.set(shadowCardRef.current, { opacity: 0.5 });
        gsap.set(cardFlipRef.current, { opacity: 0, rotateY: 0 });
        gsap.set(card2Ref.current, { opacity: 1 });
        gsap.set(demoCardRef.current, { opacity: 0 });
        gsap.set(topCardContainerRef.current, {
          x: 0,
          y: 0,
          scale: 1,
          transformOrigin: "top left",
        });

        let isCardTransferred = false;

        const moveCardToFlip = () => {
          if (
            !topCardRef.current ||
            !cardFlipRef.current ||
            !topCardContainerRef.current ||
            isCardTransferred
          ) {
            return;
          }

          const isMobile = window.matchMedia("(max-width: 900px)").matches;

          cardFlipRef.current.prepend(topCardRef.current);
          topCardRef.current.style.position = "absolute";
          topCardRef.current.style.top = isMobile ? "0" : "7rem";
          topCardRef.current.style.left = isMobile ? "0" : "-3px";
          topCardRef.current.style.width = "100%";
          topCardRef.current.style.backfaceVisibility = "hidden";

          gsap.set(cardFlipRef.current, { opacity: 1 });
          gsap.set(topCardContainerRef.current, { opacity: 0 });

          isCardTransferred = true;
        };

        const moveCardToFixed = () => {
          if (
            !topCardRef.current ||
            !topCardContainerRef.current ||
            !cardFlipRef.current ||
            !isCardTransferred
          ) {
            return;
          }

          topCardContainerRef.current.appendChild(topCardRef.current);
          topCardRef.current.removeAttribute("style");
          topCardRef.current.className = "w-full";

          gsap.set(cardFlipRef.current, { opacity: 0, rotateY: 0 });
          gsap.set(topCardContainerRef.current, { opacity: 1 });

          isCardTransferred = false;
        };

        // Animation 1: Move card from top-20 to top-40 and fade out shadow
        const moveTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: virtualSectionRef.current,
            start: "top bottom",
            end: "top 70%",
            scrub: 1,
          },
        });

        moveTimeline
          .to(
            topCardContainerRef.current,
            {
              top: "10rem", // top-40 in Tailwind
              ease: "none",
            },
            0,
          )
          .to(
            shadowCardRef.current,
            {
              opacity: 0,
              ease: "none",
            },
            0,
          );

        // Animation 2: Card rotation and features animation (based on VirtualCard.tsx)
        const items = gsap.utils.toArray<HTMLElement>(
          ".vc-item",
          featuresRef.current,
        );

        const buildTimeline = (stepPx: number) => {
          const isMobile = window.matchMedia("(max-width: 900px)").matches;
          const itemStep = 1;
          const itemInDuration = 0.6;
          const descInDuration = 0.4;
          const totalDuration = (items.length - 1) * itemStep + itemInDuration;
          const scrollDistance = totalDuration * stepPx;

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: virtualSectionRef.current,
              start: "top top",
              end: `+=${scrollDistance}`,
              pin: true,
              pinSpacing: true,
              scrub: 1,
              onEnter: () => moveCardToFlip(),
              onEnterBack: () => moveCardToFlip(),
              onLeave: () => {
                if (!isMobile) {
                  moveCardToFixed();
                }
              },
              onLeaveBack: () => moveCardToFixed(),
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

          return () => {
            timeline.scrollTrigger?.kill();
            timeline.kill();
          };
        };

        const items2 = gsap.utils.toArray<HTMLElement>(
          ".vc-item-2",
          features2Ref.current,
        );

        const buildPhysicalTimeline = (stepPx: number) => {
          const moveDuration = 0.8;
          const itemStep = 1;
          const itemInDuration = 0.6;
          const descInDuration = 0.4;
          const totalDuration = (items2.length - 1) * itemStep + itemInDuration;
          const scrollDistance = (moveDuration + totalDuration) * stepPx;

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: CardSectionRef.current,
              start: "top 0%",
              end: `+=${scrollDistance}`,
              pin: true,
              pinSpacing: true,
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const movementThreshold =
                  moveDuration / (moveDuration + totalDuration);

                if (
                  self.progress >= movementThreshold &&
                  topCardContainerRef.current &&
                  CardSectionRef.current
                ) {
                  if (
                    topCardContainerRef.current.style.position !== "absolute"
                  ) {
                    const cardRect =
                      topCardContainerRef.current.getBoundingClientRect();
                    const parentRect =
                      CardSectionRef.current.getBoundingClientRect();

                    topCardContainerRef.current.style.position = "absolute";
                    topCardContainerRef.current.style.zIndex = "60";
                    topCardContainerRef.current.style.left = `${
                      cardRect.left - parentRect.left
                    }px`;
                    topCardContainerRef.current.style.top = `${
                      cardRect.top - parentRect.top
                    }px`;
                    topCardContainerRef.current.style.width = `${cardRect.width}px`;
                    topCardContainerRef.current.style.height = `${cardRect.height}px`;
                    topCardContainerRef.current.style.pointerEvents = "none";

                    gsap.set(topCardContainerRef.current, {
                      x: 0,
                      y: 0,
                      scale: 1,
                    });
                  }
                }
              },
              onLeaveBack: () => {
                if (topCardContainerRef.current) {
                  topCardContainerRef.current.style.position = "fixed";
                  topCardContainerRef.current.style.zIndex = "50";
                  topCardContainerRef.current.style.left = "";
                  topCardContainerRef.current.style.top = "5rem";
                  topCardContainerRef.current.style.width = "";
                  topCardContainerRef.current.style.height = "";
                  topCardContainerRef.current.style.pointerEvents = "";
                  gsap.set(topCardContainerRef.current, {
                    x: 0,
                    y: 0,
                    scale: 1,
                  });
                }
              },
            },
          });

          gsap.set(items2, { opacity: 0, y: 300 });

          timeline.to(
            topCardContainerRef.current,
            {
              x: () => {
                if (!demoCardRef.current || !topCardContainerRef.current) {
                  return 0;
                }
                gsap.set(topCardContainerRef.current, {
                  x: 0,
                  y: 0,
                  scale: 1,
                });
                const cardRect =
                  topCardContainerRef.current.getBoundingClientRect();
                const targetRect = demoCardRef.current.getBoundingClientRect();
                return targetRect.left - cardRect.left;
              },
              y: () => {
                if (!demoCardRef.current || !topCardContainerRef.current) {
                  return 0;
                }
                gsap.set(topCardContainerRef.current, {
                  x: 0,
                  y: 0,
                  scale: 1,
                });
                const cardRect =
                  topCardContainerRef.current.getBoundingClientRect();
                const targetRect = demoCardRef.current.getBoundingClientRect();
                return targetRect.top - cardRect.top;
              },
              scale: () => {
                if (!demoCardRef.current || !topCardContainerRef.current) {
                  return 1;
                }
                gsap.set(topCardContainerRef.current, {
                  x: 0,
                  y: 0,
                  scale: 1,
                });
                const cardRect =
                  topCardContainerRef.current.getBoundingClientRect();
                const targetRect = demoCardRef.current.getBoundingClientRect();
                return targetRect.width / cardRect.width;
              },
              duration: moveDuration,
              ease: "power2.out",
            },
            0,
          );

          items2.forEach((item, index) => {
            const desc = item.querySelector<HTMLElement>(".vc-desc");
            const startAt = moveDuration + index * itemStep;

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
                  items2[index - 1]?.querySelector<HTMLElement>(".vc-desc");
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

          timeline.to(
            [features2Ref.current, physicalTitleRef.current],
            { opacity: 0, duration: 0.4 },
            moveDuration + totalDuration + 0.1,
          );

          return () => {
            timeline.scrollTrigger?.kill();
            timeline.kill();
          };
        };

        mm.add("(min-width: 901px)", () => buildTimeline(420));
        mm.add("(max-width: 900px)", () => buildTimeline(360));
        mm.add("(min-width: 901px)", () => buildPhysicalTimeline(420));
        mm.add("(max-width: 900px)", () => buildPhysicalTimeline(360));
      }, virtualSectionRef);

      return () => {
        ctx.revert();
        mm.revert();
      };
    },
    { scope: virtualSectionRef },
  );

  return (
    <section className="relative min-h-screen text-[#1f1f1f]">
      <div className="relative">
        {/* Hero Section */}
        <div
          className="mx-auto flex h-[50vh] max-[900px]:h-[66vh]  pt-16 max-[900px]:pt-24 lg:items-center md:items-center justify-center px-6"
          style={{
            backgroundImage:
              "radial-gradient(70% 70% at 62% 58%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 35%, rgba(255,255,255,0) 60%), " +
              "linear-gradient(180deg, #c79aa7 0%, #d7b1ab 40%, #f3e3a7 100%)",
          }}
        >
          <div className="lg:hidden md:hidden text-center">
            <h1 className="text-[2.5rem] text-white header leading-[0.9]">
              Keytom card
            </h1>
            <p className="mt-5 small-text  text-[0.8rem] text-lighter leading-relaxed text-white/85">
              From everyday moments to travels abroad, use your Keytom Card with
              ease — funded through assets you convert within the Keytom.
            </p>
            <button className="mt-6 small-btn inline-flex items-center gap-3 rounded-[3px] bg-[#3c4b86] px-5 py-3 text-[0.85rem] font-semibold uppercase tracking-[0] text-white shadow-sm">
              Get started today
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/70 text-[0.7rem]">
                ↗
              </span>
            </button>
          </div>
          <div
            ref={topCardContainerRef}
            className="fixed lg:top-20 max-[900px]:top-[47%] z-50 w-[min(70vw,360px)]"
          >
            <img
              ref={topCardRef}
              src="/assets/images/card1.jpeg"
              alt="Keytom card"
              className="w-full"
            />
          </div>
        </div>

        <div
          className="mx-auto flex h-[50vh] max-[900px]:h-[38vh] relative z-10 items-end px-6 lg:pb-12 md:pb-12 text-white"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #d1a4ad 0%, #9a82b1 40%, #041B8B 100%)",
          }}
        >
          <div
            ref={shadowCardRef}
            className="absolute  left-1/2  transform -translate-x-1/2  top-4 w-[min(70vw,360px)]"
          >
            <img
              src="/assets/images/card1.jpeg"
              alt="Keytom card"
              className="w-full rounded-[3px] rotate-[180deg]"
            />

            <div className="lg:max-w-60 lg:hidden md:hidden absolute -bottom-24 md:max-w-60 small-btn text-left max-[900px]:text-center">
              <p className="text-[0.98rem] leading-relaxed text-white/85">
                A convenient app to manage your card and accounts.
              </p>
              <div className="mt-5 flex justify-end gap-2 max-[900px]:justify-start">
                <button className="relative border border-white/80 rounded-1 px-3 py-2 pl-8 bg-transparent text-white font-semibold text-[0.7rem] leading-[1.1] flex flex-col items-start">
                  <span className="absolute left-[8px] top-1/2 -translate-y-1/2 text-[1.1rem] opacity-95">
                    <FaApple />
                  </span>
                  <span className="text-[0.5rem] font-medium opacity-80">
                    Download on the
                  </span>
                  App Store
                </button>
                <button className="relative border border-white/80 rounded-1 px-3 py-2 pl-8 bg-transparent text-white font-semibold text-[0.7rem] leading-[1.1] flex flex-col items-start">
                  <span className="absolute left-[8px] top-1/2 -translate-y-1/2 text-[1.1rem] opacity-95">
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
          <div className="mx-auto flex w-full  max-w-[1200px] items-end justify-between gap-10 max-[900px]:flex-col max-[900px]:items-start">
            <div className="max-w-[320px] max-[900px]:hidden">
              <h1 className="text-[3.6rem] font-light leading-[0.9]">
                Keytom
                <br />
                card
              </h1>
              <p className="mt-5 text-[0.78rem] text-lighter leading-relaxed text-white/85">
                From everyday moments to travels abroad, use your Keytom Card
                with ease — funded through assets you convert within the Keytom.
              </p>
              <button className="mt-6 inline-flex items-center gap-3 rounded-[3px] bg-[#3c4b86] px-5 py-5 text-[0.85rem] font-semibold uppercase tracking-[0.08em] shadow-sm">
                Get started today
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/70 text-[0.7rem]">
                  ↗
                </span>
              </button>
            </div>

            <div className="lg:max-w-60 max-[900px]:hidden md:max-w-60 small-btn text-left max-[900px]:text-center">
              <p className="text-[0.98rem] leading-relaxed text-white/85">
                A convenient app to manage your card and accounts.
              </p>
              <div className="mt-5 flex justify-end gap-2 max-[900px]:justify-start">
                <button className="relative border border-white/80 rounded-1 px-3 py-2 pl-8 bg-transparent text-white font-semibold text-[0.7rem] leading-[1.1] flex flex-col items-start">
                  <span className="absolute left-[8px] top-1/2 -translate-y-1/2 text-[1.1rem] opacity-95">
                    <FaApple />
                  </span>
                  <span className="text-[0.5rem] font-medium opacity-80">
                    Download on the
                  </span>
                  App Store
                </button>
                <button className="relative border border-white/80 rounded-1 px-3 py-2 pl-8 bg-transparent text-white font-semibold text-[0.7rem] leading-[1.1] flex flex-col items-start">
                  <span className="absolute left-[8px] top-1/2 -translate-y-1/2 text-[1.1rem] opacity-95">
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
        </div>

        {/* Virtual Card Section */}
        <section
          ref={virtualSectionRef}
          className="py-28 min-h-screen max-[900px]:py-20"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-[#3a57b5] relative max-[900px]:leading-8 keytom-heading z-50 font-semibold max-[900px]:text-[clamp(2rem,4vw,2rem)] text-[clamp(2.6rem,4.6vw,4.8rem)] mb-8">
              Keytom
              <br />
              Virtual Card
            </h2>

            <div className="grid grid-cols-[1.05fr_1fr] gap-12 items-start max-[900px]:grid-cols-1 max-[900px]:gap-0">
              {/* Card Container */}
              <div className="flex items-center justify-center min-h-105 sticky top-20 max-[900px]:static max-[900px]:min-h-[180px] max-[900px]:max-h-[200px] max-[900px]:mb-0">
                <div
                  className="relative w-[min(90%,460px)] h-[320px] max-[900px]:w-[min(100%,340px)] max-[900px]:h-[240px]"
                  style={{ perspective: "1000px" }}
                >
                  <div
                    ref={cardFlipRef}
                    className="relative w-full lg:h-full md:h-full h-fit"
                    style={{
                      transformStyle: "preserve-3d",
                      willChange: "transform",
                    }}
                  >
                    <img
                      ref={card2Ref}
                      src="/assets/images/card1.jpeg"
                      alt="Keytom card back"
                      className="w-full z-40 max-[900px]:h-47.5 -rotate-5 rounded-[1px] absolute top-26 left-0 max-[900px]:top-0 max-[900px]:left-0"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div
                ref={featuresRef}
                className="overflow-hidden relative max-[900px]:overflow-visible"
              >
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="vc-item py-4 border-b keytom-heading border-[#b9c3ff95] last:border-b-0"
                  >
                    <div className="vc-header flex keytom-heading items-center lg:gap-4 md:gap-4 gap-2">
                      <div className="inline-flex items-center gap-2 lg:px-4 px-3 lg:py-1 py-0 rounded-full border border-[#b9c4ff] text-[#3a57b5] font-semibold text-[0.8rem] lg:min-w-[56px] justify-center">
                        <span className="lg:w-2 lg:h-2 md:h-2 md:w-2 w-1 h-1 rounded-full bg-[#3a57b5]" />
                        <span>{feature.number}</span>
                      </div>
                      <h3 className="text-[1rem] max-[900px]:text-[1rem] font-semibold text-[#3a57b5]">
                        {feature.title}
                      </h3>
                    </div>

                    <p className="vc-desc lg:ml-18 ml-13 mt-2 lg:text-[0.7rem] text-[0.7rem] leading-snug text-[#4b5fc0]">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div
          ref={CardSectionRef}
          className="h-screen bg-[url('/assets/images/bg.png')] bg-cover relative bg-center bg-fixed"
        >
          <div className="w-full h-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500">
            {/* <div className="w-[400px] h-[250px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500"> */}
            {/* the below image of card1 is demo image  */}
            <img
              ref={demoCardRef}
              src="/assets/images/card1.jpeg"
              alt="Keytom card back"
              className="w-[120px] h-[80px] z-40   rounded-[1px] absolute top-34 left-[37%]"
            />

            <img
              src="/assets/images/card3.png"
              alt="Keytom card back"
              className="w-full z-1 max-[900px]:h-47.5  rounded-[1px] absolute bottom-0 right-[10%]"
            />

            {/* Features2 List */}
            <div
              ref={features2Ref}
              className="overflow-hidden w-[35%] float-right z-50 mt-36 flex-1 relative max-[900px]:overflow-visible"
            >
              {features2.map((feature, index) => (
                <div
                  key={index}
                  className="vc-item-2 py-4 border-b border-[#ffffff] last:border-b-0"
                >
                  <div className="vc-header flex items-center lg:gap-4 md:gap-4 gap-2">
                    <div className="inline-flex items-center gap-2 lg:px-4 px-3 lg:py-1 py-0 rounded-full border border-[#ffffff] text-[#ffffff] font-semibold text-[0.8rem] lg:min-w-[56px] justify-center">
                      <span className="lg:w-2 lg:h-2 md:h-2 md:w-2 w-1 h-1 rounded-full bg-[#ffffff]" />
                      <span>{feature.number}</span>
                    </div>
                    <h3 className="text-[1rem] max-[900px]:text-[1rem] font-semibold text-[#ffffff]">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="vc-desc lg:ml-18 ml-13 mt-2 lg:text-[0.7rem] text-[0.7rem] leading-snug text-[#ffffff]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <div
              ref={physicalTitleRef}
              className="absolute bottom-10 left-5 text-4xl "
            >
              <h1 className="text-white">PHYSICAL CARDS</h1>
              <h1 className="text-white/30">(COMING SOON...)</h1>
            </div>
          </div>
        </div>

        <div className="h-screen  max-h-screen mx-auto px-12">hello</div>
      </div>
    </section>
  );
}

export default function CardsPage() {
  return (
    <main className="overflow-x-hidden">
      <CardsContent />
    </main>
  );
}
