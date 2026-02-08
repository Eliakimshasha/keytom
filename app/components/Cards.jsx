const cards = [
  {
    label: "Planning",
    title: "Roadmap-ready templates",
  },
  {
    label: "Execution",
    title: "Weekly action rituals",
  },
  {
    label: "Insights",
    title: "Decision history in one place",
  },
];

export default function Cards() {
  return (
    <section className="w-full border-t border-subtle">
      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-base-color">Cards</h2>
            <p className="mt-2 text-sm text-muted">
              Modular building blocks for every initiative.
            </p>
          </div>
          <button className="hidden rounded-full border border-subtle bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-base-color hover-bg-surface-strong md:inline-flex">
            View all
          </button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="card-surface p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-subtle">
                {card.label}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-base-color">
                {card.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
