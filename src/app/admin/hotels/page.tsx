"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getAllHotels, deleteHotel, Hotel } from "@/libs/adminApi";

export default function AdminHotelsPage() {
  const { data: session } = useSession();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const token = session?.user?.token || "";

  useEffect(() => {
    if (token) {
      loadHotels();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const loadHotels = async () => {
    setLoading(true);
    const result = await getAllHotels(token);
    if (result.success && result.data) {
      setHotels(result.data);
    }
    setLoading(false);
  };

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (hotelId: string, hotelName: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${hotelName}"? This will also delete all associated bookings.`
      )
    ) {
      return;
    }

    setDeletingId(hotelId);
    const result = await deleteHotel(hotelId, token);
    if (result.success) {
      setHotels(hotels.filter((h) => h._id !== hotelId));
    } else {
      alert(result.message || "Failed to delete hotel");
    }
    setDeletingId(null);
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-44px)] bg-gray-50 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center text-gray-500">Loading hotels...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-44px)] bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-500 shadow hover:bg-gray-50"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Manage Hotels
              </h1>
              <p className="text-sm text-gray-500">
                {filteredHotels.length} of {hotels.length} hotels
              </p>
            </div>
          </div>
          <Link
            href="/admin/hotels/add"
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Hotel
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search hotels by name, province, or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Hotels Grid */}
        {filteredHotels.length === 0 ? (
          <div className="rounded-lg bg-white p-12 text-center shadow">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <p className="mt-4 text-gray-500">No hotels found</p>
            <Link
              href="/admin/hotels/add"
              className="mt-4 inline-block rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
            >
              Add your first hotel
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel._id}
                className="overflow-hidden rounded-lg bg-white shadow"
              >
                {/* Hotel Image */}
                <div className="h-40 bg-gray-200">
                  {hotel.imgSrc ? (
                    <Image
                      src={hotel.imgSrc}
                      alt={hotel.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-300 to-blue-500">
                      <svg
                        className="h-12 w-12 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Hotel Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">{hotel.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {hotel.address}, {hotel.district}, {hotel.province}
                  </p>
                  {hotel.tel && (
                    <p className="mt-1 text-sm text-gray-500">
                      Tel: {hotel.tel}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/admin/hotels/${hotel._id}/edit`}
                      className="flex-1 rounded-lg bg-blue-50 py-2 text-center text-sm font-medium text-blue-600 hover:bg-blue-100"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(hotel._id, hotel.name)}
                      disabled={deletingId === hotel._id}
                      className="flex-1 rounded-lg bg-red-50 py-2 text-sm font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
                    >
                      {deletingId === hotel._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
