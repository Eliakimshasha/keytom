export default function About() {
  return (
    <section id="about" className="w-full border-t border-subtle">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-14">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-subtle">
          <span>About</span>
          <span className="h-px w-16 bg-surface-strong" />
        </div>
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <h2 className="text-3xl font-semibold leading-tight text-base-color">
            Focused on clarity, speed, and measurable progress.
          </h2>
          <p className="text-base text-muted">
            Keytom provides a shared workspace for decisions, action plans, and
            accountability. Keep everyone moving in the same direction with
            clear next steps and the context to act confidently.
          </p>
        </div>
      </div>
    </section>
  );
}
