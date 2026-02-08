const reasons = [
  "Clear ownership with lightweight accountability.",
  "Shared context that keeps teams moving faster.",
  "Decision logs that reduce repeated debates.",
  "Progress snapshots that leadership can trust.",
];

export default function WhyUs() {
  return (
    <section id="features" className="w-full border-t border-subtle">
      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-semibold text-base-color">
              Why Keytom
            </h2>
            <p className="mt-3 text-sm text-muted">
              Designed for teams who need clarity without the overhead.
            </p>
          </div>
          <div className="grid gap-3">
            {reasons.map((reason) => (
              <div
                key={reason}
                className="card-surface-soft px-4 py-3 text-sm text-base-color"
              >
                {reason}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
