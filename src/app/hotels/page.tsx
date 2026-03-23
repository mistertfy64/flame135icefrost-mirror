"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import HotelCard from "@/components/HotelCard";
import type { Hotel } from "@/libs/hotelApi";
import { fetchAllHotels, formatHotelLocation } from "@/libs/hotelApi";

const hotelGradients = [
  "linear-gradient(145deg, #5b3a29 0%, #9f7455 38%, #d8c0a2 100%)",
  "linear-gradient(145deg, #724e3a 0%, #9b7d66 34%, #8ab5ce 67%, #f3be86 100%)",
  "linear-gradient(145deg, #0e2c4b 0%, #1e4b78 28%, #4f7db0 58%, #f0b272 100%)",
  "linear-gradient(145deg, #6b4c3a 0%, #9b7d66 34%, #c9a878 100%)",
  "linear-gradient(145deg, #1a3a52 0%, #2d5a7b 50%, #5a8acc 100%)",
  "linear-gradient(145deg, #4a3d2a 0%, #8b6f47 50%, #d4a574 100%)",
];

export default function HotelsPage() {
  const searchParams = useSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearchTerm(query);
  }, [searchParams]);

  useEffect(() => {
    const loadHotels = async () => {
      setLoading(true);
      const data = await fetchAllHotels();
      setHotels(data);
      setLoading(false);
    };
    loadHotels();
  }, []);

  const provinces = useMemo(() => {
    const unique = [...new Set(hotels.map((h) => h.province).filter(Boolean))];
    return unique.sort();
  }, [hotels]);

  const regions = useMemo(() => {
    const unique = [...new Set(hotels.map((h) => h.region).filter(Boolean))];
    return unique.sort();
  }, [hotels]);

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.district.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProvince =
      !selectedProvince || hotel.province === selectedProvince;

    const matchesRegion = !selectedRegion || hotel.region === selectedRegion;

    return matchesSearch && matchesProvince && matchesRegion;
  });

  const clearFilters = () => {
    setSelectedProvince("");
    setSelectedRegion("");
  };

  const hasActiveFilters = selectedProvince || selectedRegion;

  return (
    <main className="min-h-screen bg-[var(--surface-page)] py-8 md:py-12">
      <div className="mx-auto w-[var(--general-width)]">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--text-heading)] md:text-5xl">
            Browse Hotels
          </h1>
          <p className="mt-2 text-[#8a909a]">
            Discover {hotels.length} amazing hotels across Thailand
          </p>
        </div>

        <div className="mb-8 flex flex-col items-center gap-3 md:flex-row">
          <input
            type="text"
            placeholder="Search hotels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 flex-1 rounded-lg border border-[#d6d8dc] bg-white px-4 text-sm placeholder:text-[#9aa1ab] focus:border-[var(--brand-500)] focus:outline-none"
          />
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`h-11 rounded-lg px-4 hover:bg-[#cbcdd1] ${
                hasActiveFilters
                  ? "bg-[var(--brand-500)] text-white hover:bg-[var(--brand-600)]"
                  : "bg-[#d6d8dc] text-[#7a818b]"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>

            {showFilters && (
              <div className="absolute right-0 top-full z-10 mt-2 w-72 rounded-lg border border-[#d6d8dc] bg-white p-4 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-medium text-[#1d232b]">Filters</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-[var(--brand-500)] hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="mb-4">
                  <label className="mb-1.5 block text-xs font-medium text-[#7a818b]">
                    Province
                  </label>
                  <select
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                    className="h-10 w-full rounded-md border border-[#d6d8dc] bg-white px-3 text-sm focus:border-[var(--brand-500)] focus:outline-none"
                  >
                    <option value="">All Provinces</option>
                    {provinces.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#7a818b]">
                    Region
                  </label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="h-10 w-full rounded-md border border-[#d6d8dc] bg-white px-3 text-sm focus:border-[var(--brand-500)] focus:outline-none"
                  >
                    <option value="">All Regions</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-[#7a818b]">Active filters:</span>
            {selectedProvince && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--brand-100)] px-3 py-1 text-xs text-[var(--brand-700)]">
                {selectedProvince}
                <button
                  onClick={() => setSelectedProvince("")}
                  className="ml-1 hover:text-[var(--brand-900)]"
                >
                  ×
                </button>
              </span>
            )}
            {selectedRegion && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--brand-100)] px-3 py-1 text-xs text-[var(--brand-700)]">
                {selectedRegion}
                <button
                  onClick={() => setSelectedRegion("")}
                  className="ml-1 hover:text-[var(--brand-900)]"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#d6d8dc] border-t-[var(--brand-500)]" />
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-[#8a909a]">
              Found {filteredHotels.length} hotel{filteredHotels.length !== 1 ? "s" : ""}
            </p>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredHotels.map((hotel, index) => (
                <HotelCard
                  key={hotel._id}
                  name={hotel.name}
                  location={formatHotelLocation(hotel)}
                  tel={hotel.tel}
                  address={hotel.address}
                  district={hotel.district}
                  province={hotel.province}
                  postalcode={hotel.postalcode}
                  region={hotel.region}
                  heroStyle={{
                    background:
                      hotelGradients[index % hotelGradients.length],
                  }}
                />
              ))}
            </div>

            {filteredHotels.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 text-[#d6d8dc]"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <p className="mt-4 text-[#8a909a]">No hotels found</p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
