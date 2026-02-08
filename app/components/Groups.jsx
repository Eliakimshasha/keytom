const groups = [
  {
    name: "Founders",
    description: "Keep strategic priorities visible while scaling fast.",
  },
  {
    name: "Ops Teams",
    description: "Translate decisions into consistent execution loops.",
  },
  {
    name: "Product Teams",
    description: "Align roadmap bets with measurable customer impact.",
  },
];

export default function Groups() {
  return (
    <section className="w-full border-t border-subtle">
      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-semibold text-base-color">Groups</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group.name}
              className="card-surface p-5"
            >
              <h3 className="text-lg font-semibold text-base-color">
                {group.name}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {group.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
