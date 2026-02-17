"use client";

export function BusinessContent() {
  return (
    <section className="bg-white text-[#1f1f1f] py-24">
      <div className="container mx-auto px-6">
        <h1 className="text-[clamp(2.4rem,4vw,4.2rem)] font-semibold text-[#404040]">
          Business
        </h1>
        <p className="mt-4 text-[1rem] text-[#5a5a5a] max-w-2xl">
          Business page content goes here.
        </p>
      </div>
    </section>
  );
}

export default function BusinessPage() {
  return (
    <main className="overflow-x-hidden">
      <BusinessContent />
    </main>
  );
}
