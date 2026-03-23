"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Hotel } from "@/libs/hotelApi";
import { fetchAllHotels, formatHotelLocation } from "@/libs/hotelApi";

export default function AdminHotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    setLoading(true);
    const data = await fetchAllHotels();
    setHotels(data);
    setLoading(false);
  };

  const handleDelete = async (hotelId: string) => {
    if (!confirm("Are you sure you want to delete this hotel?")) {
      return;
    }

    setDeletingId(hotelId);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || process.env.BACKEND_BASE_URL;
      const response = await fetch(`${baseUrl}/api/v1/hotels/${hotelId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setHotels(hotels.filter((h) => h._id !== hotelId));
      } else {
        alert("Failed to delete hotel");
      }
    } catch (error) {
      console.error("Error deleting hotel:", error);
      alert("Error deleting hotel");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--surface-page)] py-8">
        <div className="mx-auto w-[var(--general-width)]">
          <div className="text-center text-[#8a909a]">Loading hotels...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--surface-page)]">
      <div className="mx-auto w-[var(--general-width)] py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-heading)]">
              Manage Hotels
            </h1>
          </div>
          <Link
            href="/admin/hotels/add"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            + Add Hotel
          </Link>
        </div>

        {/* Hotels List */}
        <div className="space-y-4">
          {hotels.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-[#e5e7eb]">
              <p className="text-[#8a909a]">No hotels found. Create one to get started!</p>
            </div>
          ) : (
            hotels.map((hotel) => (
              <div
                key={hotel._id}
                className="bg-white rounded-lg shadow-sm p-6 border border-[#e5e7eb] hover:shadow-md transition-shadow"
              >
                <div className="flex gap-6">
                  {/* Hotel Image */}
                  <div className="flex-shrink-0 w-40 h-32 rounded-lg overflow-hidden bg-gray-200">
                    <div className="w-full h-full bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center text-white text-3xl">
                      🏨
                    </div>
                  </div>

                  {/* Hotel Info */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-[var(--text-heading)] mb-2">
                      {hotel.name}
                    </h3>
                    <div className="space-y-1 text-sm text-[#6b7280] mb-4">
                      <p className="flex items-center gap-2">
                        <span>📍</span>
                        {formatHotelLocation(hotel)}
                      </p>
                      <p className="flex items-center gap-2">
                        <span>📞</span>
                        {hotel.tel}
                      </p>
                      <p className="flex items-center gap-2">
                        <span>🗺️</span>
                        Region: {hotel.region}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex-shrink-0 flex gap-3 items-start pt-2">
                    <Link
                      href={`/admin/hotels/edit/${hotel._id}`}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit hotel"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDelete(hotel._id)}
                      disabled={deletingId === hotel._id}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete hotel"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <footer className="border-t border-[#d6d8dc] py-8 text-center text-xs text-[#8a909a] mt-12">
        © 2028 HotelBook. All rights reserved.
      </footer>
    </main>
  );
}
