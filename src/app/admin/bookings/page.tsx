"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Booking {
  _id: string;
  userId: string;
  userName: string;
  hotelId: string;
  hotelName: string;
  hotelLocation: string;
  checkIn: string;
  checkOut: string;
  roomCount: number;
  guestCount: number;
  status: string;
  createdAt: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || process.env.BACKEND_BASE_URL;
      const response = await fetch(`${baseUrl}/api/v1/bookings`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setBookings(data.data);
        } else {
          // Fallback to mock data if API doesn't return bookings
          setBookings([
            {
              _id: "1",
              userId: "user1",
              userName: "John Doe",
              hotelId: "hotel1",
              hotelName: "Grand Palace Hotel",
              hotelLocation: "Phra Nakhon, Bangkok",
              checkIn: "Apr 15, 2026",
              checkOut: "Apr 17, 2026",
              roomCount: 1,
              guestCount: 2,
              status: "confirmed",
              createdAt: "Mar 15, 2026",
            },
            {
              _id: "2",
              userId: "user1",
              userName: "John Doe",
              hotelId: "hotel2",
              hotelName: "Mountain View Lodge",
              hotelLocation: "Mueang, Chiang Mai",
              checkIn: "May 20, 2026",
              checkOut: "May 23, 2026",
              roomCount: 1,
              guestCount: 1,
              status: "confirmed",
              createdAt: "Mar 16, 2026",
            },
          ]);
        }
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
      // Set mock data on error
      setBookings([
        {
          _id: "1",
          userId: "user1",
          userName: "John Doe",
          hotelId: "hotel1",
          hotelName: "Grand Palace Hotel",
          hotelLocation: "Phra Nakhon, Bangkok",
          checkIn: "Apr 15, 2026",
          checkOut: "Apr 17, 2026",
          roomCount: 1,
          guestCount: 2,
          status: "confirmed",
          createdAt: "Mar 15, 2026",
        },
        {
          _id: "2",
          userId: "user1",
          userName: "John Doe",
          hotelId: "hotel2",
          hotelName: "Mountain View Lodge",
          hotelLocation: "Mueang, Chiang Mai",
          checkIn: "May 20, 2026",
          checkOut: "May 23, 2026",
          roomCount: 1,
          guestCount: 1,
          status: "confirmed",
          createdAt: "Mar 16, 2026",
        },
      ]);
    }
    setLoading(false);
  };

  const handleDelete = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    setDeletingId(bookingId);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || process.env.BACKEND_BASE_URL;
      const response = await fetch(`${baseUrl}/api/v1/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setBookings(bookings.filter((b) => b._id !== bookingId));
      } else {
        alert("Failed to delete booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Error deleting booking");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--surface-page)] py-8">
        <div className="mx-auto w-[var(--general-width)]">
          <div className="text-center text-[#8a909a]">Loading bookings...</div>
        </div>
      </main>
    );
  }

  const calculateNights = (checkIn: string, checkOut: string) => {
    try {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 1;
    } catch {
      return 1;
    }
  };

  return (
    <main className="min-h-screen bg-[var(--surface-page)]">
      <div className="mx-auto w-[var(--general-width)] py-8 md:py-12">

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-sm border border-[#e5e7eb] overflow-hidden">
          {bookings.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-[#8a909a]">No bookings found. Create one to get started!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                    <th className="px-6 py-3 text-left font-semibold text-[#6b7280]">
                      User
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-[#6b7280]">
                      Hotel
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-[#6b7280]">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-[#6b7280]">
                      Check-in
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-[#6b7280]">
                      Nights
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-[#6b7280]">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-[#6b7280]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr
                      key={booking._id}
                      className={`border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors ${
                        index === bookings.length - 1 ? "border-b-0" : ""
                      }`}
                    >
                      <td className="px-6 py-4 text-[var(--text-heading)]">
                        <div className="flex items-center gap-2">
                          <span>👤</span>
                          {booking.userName}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[var(--text-heading)]">
                        {booking.hotelName}
                      </td>
                      <td className="px-6 py-4 text-[#6b7280]">
                        {booking.hotelLocation}
                      </td>
                      <td className="px-6 py-4 text-[#6b7280]">
                        {booking.checkIn}
                      </td>
                      <td className="px-6 py-4 text-[#6b7280]">
                        {calculateNights(booking.checkIn, booking.checkOut)}
                      </td>
                      <td className="px-6 py-4 text-[#6b7280]">
                        {booking.createdAt}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <Link
                            href={`/admin/bookings/edit/${booking._id}`}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit booking"
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
                            onClick={() => handleDelete(booking._id)}
                            disabled={deletingId === booking._id}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete booking"
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <footer className="border-t border-[#d6d8dc] py-8 text-center text-xs text-[#8a909a] mt-12">
        © 2028 HotelBook. All rights reserved.
      </footer>
    </main>
  );
}
