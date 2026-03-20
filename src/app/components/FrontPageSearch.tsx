"use client";

export default function FrontPageSearch() {
  return (
    <div className="flex flex-col md:flex-row md:w-[42.5%] md:justify-between">
      <input className="bg-white text-black p-[8px] text-xl rounded-md my-[4px] md:mr-[8px] md:my-[0px] md:flex-grow"></input>
      <button className="bg-emerald-700 rounded-md p-[8px] text-xl">
        Search
      </button>
    </div>
  );
}
