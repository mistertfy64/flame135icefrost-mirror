import Image from "next/image";
import type { CSSProperties } from "react";

interface HotelProp {
  name: string;
  location: string;
  tel: string;
  imageURL?: string;
  heroStyle?: CSSProperties;
}

export default function HotelCard(props: HotelProp) {
  return (
    <article className="overflow-hidden rounded-xl border border-[#d9dbdf] bg-white shadow-sm">
      <div
        className="relative h-[140px] w-full rounded-t-xl overflow-hidden"
        style={props.heroStyle}
      >
        <Image
          src={props.imageURL || "/placeholder.svg"}
          alt={props.imageURL ? "Hotel picture" : "No image available"}
          fill={true}
          className="rounded-t-xl object-cover opacity-45"
        />
      </div>

      <div className="px-3 py-2.5">
        <h3 className="text-[15px] font-medium text-[#1d232b]">{props.name}</h3>

        <div className="mt-2 text-[11px] text-[#7b818a]">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex h-3.5 w-3.5 items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <span>{props.location}</span>
          </div>

          <div className="mt-1 flex items-center gap-1.5">
            <span className="inline-flex h-3.5 w-3.5 items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.11 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.12.9.35 1.77.68 2.6a2 2 0 0 1-.45 2.11L8.06 9.94a16 16 0 0 0 6 6l1.51-1.27a2 2 0 0 1 2.11-.45c.83.33 1.7.56 2.6.68A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <span>{props.tel}</span>
          </div>
        </div>

        <div className="mt-2.5">
          <button className="w-full cursor-pointer rounded-md bg-[#29a3de] py-1.5 text-[12px] font-medium text-white hover:bg-[#1d8dc2]">
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}
