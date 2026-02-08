export default function Video() {
  return (
    <section className="w-full border-t border-subtle">
      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="flex items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-base-color">Video</h2>
            <p className="mt-2 text-sm text-muted">
              A quick walkthrough of the Keytom workflow.
            </p>
          </div>
          <button className="rounded-full border border-subtle bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-base-color hover-bg-surface-strong">
            Watch
          </button>
        </div>
        <div className="mt-6 aspect-video w-full rounded-3xl border border-dashed border-subtle bg-surface" />
      </div>
    </section>
  );
}
