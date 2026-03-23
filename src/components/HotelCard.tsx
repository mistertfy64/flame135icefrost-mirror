"use client";

import Image from "next/image";
import { useState } from "react";
import type { CSSProperties } from "react";

interface HotelProp {
  name: string;
  location: string;
  tel: string;
  imageURL?: string;
  heroStyle?: CSSProperties;
  address?: string;
  district?: string;
  province?: string;
  postalcode?: string;
  region?: string;
}

export default function HotelCard(props: HotelProp) {
  const [showDetails, setShowDetails] = useState(false);

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

        {showDetails && (
          <div className="mt-3 border-t border-[#e5e7eb] pt-3 text-[11px] text-[#7b818a]">
            {props.address && (
              <div className="flex items-start gap-1.5 mb-1.5">
                <span className="inline-flex h-3.5 w-3.5 items-center justify-center shrink-0 mt-0.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                    <polyline points="9,22 9,12 15,12 15,22" />
                  </svg>
                </span>
                <span><strong>Address:</strong> {props.address}</span>
              </div>
            )}
            {props.district && (
              <div className="flex items-center gap-1.5 mb-1.5">
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
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  </svg>
                </span>
                <span><strong>District:</strong> {props.district}</span>
              </div>
            )}
            {props.province && (
              <div className="flex items-center gap-1.5 mb-1.5">
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
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </span>
                <span><strong>Province:</strong> {props.province}</span>
              </div>
            )}
            {props.postalcode && (
              <div className="flex items-center gap-1.5 mb-1.5">
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
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <span><strong>Postal Code:</strong> {props.postalcode}</span>
              </div>
            )}
            {props.region && (
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
                    <polygon points="3,6 9,3 15,6 21,3 21,18 15,21 9,18 3,21" />
                    <line x1="9" y1="3" x2="9" y2="18" />
                    <line x1="15" y1="6" x2="15" y2="21" />
                  </svg>
                </span>
                <span><strong>Region:</strong> {props.region}</span>
              </div>
            )}
          </div>
        )}

        <div className="mt-2.5">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full cursor-pointer rounded-md bg-[#29a3de] py-1.5 text-[12px] font-medium text-white hover:bg-[#1d8dc2] flex items-center justify-center gap-1.5"
          >
            {showDetails ? "Hide Details" : "View Details"}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-3 w-3 transition-transform ${showDetails ? "rotate-180" : ""}`}
            >
              <polyline points="6,9 12,15 18,9" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
