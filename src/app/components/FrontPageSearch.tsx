
"use client";

export default function FrontPageSearch() {
  return (
    <div className="flex flex-col md:flex-row md:w-[42.5%] md:justify-between">
      <input className="bg-white text-black px-[8px] py-[8px] text-xl rounded-md my-[4px] md:mr-[4px] md:my-[0px] md:flex-grow"></input>
      <button className="bg-emerald-700 rounded-md px-[8px] py-[8px] text-xl">Search</button>
    </div>
  )
}