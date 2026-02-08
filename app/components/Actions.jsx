const actions = [
  {
    title: "Align priorities",
    description: "Surface the most important initiatives and keep them moving.",
  },
  {
    title: "Assign ownership",
    description: "Define clear accountability and timelines for every action.",
  },
  {
    title: "Track impact",
    description: "Measure progress with simple, consistent status updates.",
  },
];

export default function Actions() {
  return (
    <section id="actions" className="w-full border-t border-subtle">
      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-base-color">
            Action Center
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {actions.map((action) => (
              <div
                key={action.title}
                className="card-surface p-5"
              >
                <h3 className="text-lg font-semibold text-base-color">
                  {action.title}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {action.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
