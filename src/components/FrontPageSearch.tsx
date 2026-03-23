"use client";

export default function FrontPageSearch() {
  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
      <input
        placeholder="Search by hotel name, city, or region..."
        className="h-11 flex-1 rounded-md border border-transparent bg-white px-4 text-sm text-[#1e2934] outline-none placeholder:text-[#9aa1ab] focus:border-[#99d8f7]"
      />
      <button className="h-11 cursor-pointer rounded-md bg-[#f5a147] px-7 text-sm font-semibold text-white hover:bg-[#e39038]">
        Search
      </button>
    </div>
  );
}
