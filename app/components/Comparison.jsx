const comparison = [
  {
    label: "Status updates",
    keytom: "Structured weekly cadence",
    other: "Ad-hoc check-ins",
  },
  {
    label: "Decision trail",
    keytom: "Logged and searchable",
    other: "Scattered across tools",
  },
  {
    label: "Ownership",
    keytom: "Clear accountability",
    other: "Ambiguous handoffs",
  },
];

export default function Comparison() {
  return (
    <section className="w-full border-t border-subtle">
      <div className="mx-auto w-full max-w-8xl px-6 py-14">
        <h2 className="text-2xl font-semibold text-base-color">Comparison</h2>
        <div className="mt-6 grid gap-4">
          <div className="grid grid-cols-[1.2fr_1fr_1fr] text-xs font-semibold uppercase tracking-[0.2em] text-subtle">
            <span>Capability</span>
            <span>Keytom</span>
            <span>Typical</span>
          </div>
          {comparison.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[1.2fr_1fr_1fr] rounded-2xl border border-subtle bg-surface px-4 py-3 text-sm text-base-color"
            >
              <span className="font-medium">{row.label}</span>
              <span>{row.keytom}</span>
              <span className="text-muted">{row.other}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
