"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoCheckmark, IoClose, IoWarning } from "react-icons/io5";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

type Status = "yes" | "no" | "limited";

type Feature = {
  name: string;
  sub?: string;
  subMuted?: string;
  keytom: { status: Status; note: string };
  others: { status: Status; note: string };
  otc: { status: Status; note: string };
};

const features: Feature[] = [
  {
    name: "Multi-currency account (crypto + fiat)",
    keytom: { status: "yes", note: "Yes" },
    others: { status: "limited", note: "Limited support, often separated" },
    otc: { status: "no", note: "No" },
  },
  {
    name: "Integrated crypto exchange",
    keytom: { status: "yes", note: "Yes" },
    others: { status: "limited", note: "Limited or non-existent" },
    otc: { status: "yes", note: "Yes" },
  },
  {
    name: "IBAN/fiat accounts",
    keytom: { status: "yes", note: "Yes (named IBANs for SEPA transactions)" },
    others: { status: "limited", note: "Limited to EU/UK accounts" },
    otc: { status: "no", note: "No" },
  },
  {
    name: "Third Party Payments",
    keytom: {
      status: "yes",
      note: "Yes (to and from businesses and individuals)",
    },
    others: { status: "yes", note: "Yes" },
    otc: { status: "no", note: "No" },
  },
  {
    name: "Virtual & Physical cards",
    subMuted: "(coming soon)",
    keytom: { status: "yes", note: "Yes" },
    others: { status: "limited", note: "Yes, but not crypto friendly" },
    otc: {
      status: "limited",
      note: "Some offer only virtual or prepaid cards",
    },
  },
  {
    name: "Time saving account opening",
    keytom: {
      status: "yes",
      note: "Up to 5 business days for businesses, just a few minutes for individuals. Fully online.",
    },
    others: { status: "limited", note: "Takes weeks, often offline" },
    otc: { status: "yes", note: "Quick" },
  },
  {
    name: "Global availability",
    keytom: { status: "yes", note: "High (access in 126+ countries)" },
    others: { status: "limited", note: "Limited to certain regions" },
    otc: { status: "yes", note: "High" },
  },
];

export default function Comparison() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const tableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".comparison-feature", {
        scrollTrigger: {
          trigger: tableRef.current,
          start: "top 70%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getIcon = (status: Status) => {
    switch (status) {
      case "yes":
        return (
          <span className="w-5 h-5 rounded-full inline-flex items-center justify-center bg-[#38488B] text-white flex-shrink-0">
            <IoCheckmark className="text-sm" />
          </span>
        );
      case "no":
        return (
          <span className="w-5 h-5 rounded-full inline-flex items-center justify-center bg-[#666666] text-white flex-shrink-0">
            <IoClose className="text-sm" />
          </span>
        );
      case "limited":
        return <IoWarning className="text-[#666666] text-xl flex-shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="bg-white text-[#1f1f1f] py-20 md:py-28"
    >
      <div className=" mx-auto px-4 md:px-6">
        <h2
          ref={titleRef}
          className="text-center font-semibold text-3xl md:text-5xl lg:text-6xl text-[#4a4a4a] mb-8 md:mb-12"
        >
          <span className="text-[#3657ba]">Keytom</span> vs others
        </h2>

        {/* Desktop Table View */}
        <div ref={tableRef} className="hidden lg:block max-w-[1160px] mx-auto">
          {/* Table Header */}
          <div className="grid grid-cols-[1.25fr_1.2fr_1.35fr_0.8fr] border-b border-[#d8dff4]">
            <div className="px-5 py-4 font-semibold text-[#4a4a4a] text-base">
              Feature
            </div>
            <div className="px-5 py-4 font-semibold text-[#3657ba] text-base bg-[#e8ebf7] rounded-tl-xl">
              Keytom
            </div>
            <div className="px-5 py-4 font-semibold text-[#4a4a4a] text-base">
              Other financial institutions
            </div>
            <div className="px-5 py-4 font-semibold text-[#4a4a4a] text-base">
              OTC
            </div>
          </div>

          {/* Table Rows */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="comparison-feature grid grid-cols-[1.25fr_1.2fr_1.35fr_0.8fr] border-b border-[#d8dff4] last:border-b-0"
            >
              <div className="px-5 py-5 flex flex-col gap-1">
                <span className="text-[1.05rem] font-semibold text-[#3657ba] leading-tight">
                  {feature.name}
                </span>
              </div>

              <div className="px-5 py-5 flex items-center gap-3 bg-[#e8ebf7]">
                {getIcon(feature.keytom.status)}
                <span className="text-[0.95rem] text-[#4a4a4a] leading-snug">
                  {feature.keytom.note}
                </span>
              </div>

              <div className="px-5 py-5 flex items-center gap-3">
                {getIcon(feature.others.status)}
                <span className="text-[0.95rem] text-[#4a4a4a] leading-snug">
                  {feature.others.note}
                </span>
              </div>

              <div className="px-5 py-5 flex items-center gap-3">
                {getIcon(feature.otc.status)}
                <span className="text-[0.95rem] text-[#4a4a4a] leading-snug">
                  {feature.otc.note}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Stacked View */}
        <div className="lg:hidden max-w-2xl mx-auto space-y-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="comparison-feature border-b border-gray-200 pb-3"
            >
              {/* Feature Title */}
              <h3 className="text-xl md:text-2xl font-semibold text-[#38488B] mb-5">
                {feature.name}
              </h3>

              {/* Options Stack */}
              <div className="space-y-3">
                {/* Keytom */}
                <div className="bg-[linear-gradient(180deg,#9D7BA328_0%,#B58CAB2A_45%,#D4A8A124_100%)] rounded-xs  p-4 px-2">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 flex gap-5 justify-between">
                      <div className="font-semibold text-[#38488B] text-[12px] mb-1">
                        Keytom
                      </div>
                      <div className="flex items-start gap-2">
                        {getIcon(feature.keytom.status)}

                        <div className="text-[#4a4a4a] text-[12px] leading-relaxed">
                          {feature.keytom.note}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other Neobanks */}
                <div className="bg-white border-t border-gray-200 p-4 px-2">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 flex justify-between ">
                      <div className="font-semibold text-[#38488B] text-[12px] mb-1">
                        Other Neobanks
                      </div>
                      <div className="flex gap-3 items-start">
                        {getIcon(feature.others.status)}

                        <div className="text-[#4a4a4a] text-[12px] leading-relaxed">
                          {feature.others.note}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* OTC */}
                <div className="bg-white border-t border-gray-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 flex justify-between">
                      <div className="font-semibold text-[#38488B] text-[12px] mb-1">
                        OTC
                      </div>
                      <div className="flex gap-2 items-start">
                        {getIcon(feature.otc.status)}

                        <div className="text-[#4a4a4a] text-[12px] leading-relaxed">
                          {feature.otc.note}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="max-w-[1160px]  flex justify-center lg:max-w-2xl mx-auto mt-8 md:mt-10">
          <button className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#422de1] to-[#2f458b] text-white px-16 py-4 rounded-xs font-semibold text-sm uppercase tracking-wide  transition-shadow duration-300">
            Open account{" "}
            <IoArrowForwardCircleOutline className="text-lg rotate-3" />
          </button>
        </div>
      </div>
    </section>
  );
}
