import FrontPageSearch from "./FrontPageSearch";

export default function Banner() {
  return (
    <section className="relative isolate w-full overflow-hidden text-white">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#0c8fd0_0%,#0c6fc6_46%,#0a5bb7_100%)]" />
      <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#9de6ff]/25 blur-3xl [animation:heroFloat_7s_ease-in-out_infinite]" />
      <div className="absolute -bottom-24 left-[-90px] h-64 w-64 rounded-full bg-[#ffd58f]/30 blur-3xl [animation:heroFloat_8s_ease-in-out_infinite_reverse]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_28%,rgba(255,255,255,0.22),transparent_45%)]" />

      <div className="relative mx-auto w-[var(--general-width)] py-14 md:py-18">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#e4f6ff] backdrop-blur-sm md:text-xs">
              Trusted by 20,000+ travelers
            </div>

            <h1 className="mt-4 max-w-[13ch] text-4xl font-bold leading-[1.08] text-[#ffd164] md:text-6xl lg:text-7xl">
              Find Your Perfect Stay.
            </h1>

            <h2 className="mt-4 max-w-[56ch] text-base text-[#dcf2ff] md:text-xl">
              Book beautiful hotels across Thailand with instant confirmation,
              transparent prices, and verified guest reviews.
            </h2>

            <div className="mt-7 max-w-[700px]">
              <FrontPageSearch />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#d4eeff] md:text-sm">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                No booking fees
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                Free cancellation options
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                24/7 support
              </span>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="mx-auto w-full max-w-[430px] rounded-2xl border border-white/20 bg-white/10 p-4 shadow-[0_24px_50px_rgba(3,40,72,0.35)] backdrop-blur-md [animation:heroFadeUp_700ms_ease-out]">
              <div className="h-40 rounded-xl bg-[linear-gradient(140deg,#1f9fdb_0%,#40b5e7_36%,#9adcf4_100%)] p-4">
                <div className="h-full rounded-lg border border-white/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.08))] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#edf9ff]">
                    Beach Escape
                  </p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    Phuket Seaview Resort
                  </p>
                  <p className="mt-1 text-sm text-[#def3ff]">
                    Starting at $89 / night
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-white/15 px-2 py-3">
                  <p className="text-lg font-semibold">4.8</p>
                  <p className="text-[11px] text-[#d9f0ff]">Rating</p>
                </div>
                <div className="rounded-lg bg-white/15 px-2 py-3">
                  <p className="text-lg font-semibold">1200+</p>
                  <p className="text-[11px] text-[#d9f0ff]">Hotels</p>
                </div>
                <div className="rounded-lg bg-white/15 px-2 py-3">
                  <p className="text-lg font-semibold">24/7</p>
                  <p className="text-[11px] text-[#d9f0ff]">Support</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
