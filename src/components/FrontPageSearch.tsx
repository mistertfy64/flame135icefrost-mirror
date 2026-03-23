"use client";

export default function FrontPageSearch() {
  return (
    <div className="rounded-xl border border-white/15 bg-white/10 p-2.5 shadow-[0_10px_24px_rgba(0,30,62,0.2)] backdrop-blur-sm">
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
        <label className="relative block flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8e97a4]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>

          <input
            placeholder="Search by hotel name, city, or region..."
            className="h-12 w-full rounded-lg border border-transparent bg-white pl-10 pr-4 text-sm text-[#1e2934] outline-none placeholder:text-[#9aa1ab] focus:border-[#99d8f7]"
          />
        </label>

        <button className="h-12 cursor-pointer rounded-lg bg-[linear-gradient(180deg,#ffb155_0%,#f19a3f_100%)] px-7 text-sm font-semibold text-white shadow-[0_7px_14px_rgba(112,65,9,0.3)] transition hover:brightness-95">
          Search
        </button>
      </div>

      <p className="mt-2 px-1 text-xs text-[#d4ecfb]">
        Popular: Bangkok, Chiang Mai, Phuket, Pattaya
      </p>
    </div>
  );
}
