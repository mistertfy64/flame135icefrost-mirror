"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import type { Hotel } from "@/libs/hotelApi";
import { fetchAllHotels } from "@/libs/hotelApi";

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

export default function EditBookingPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [hotelsLoading, setHotelsLoading] = useState(true);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [formData, setFormData] = useState({
    userName: "",
    userId: "",
    hotelId: "",
    hotelName: "",
    hotelLocation: "",
    checkIn: "",
    checkOut: "",
    roomCount: 1,
    guestCount: 1,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load hotels
        const hotelsData = await fetchAllHotels();
        setHotels(hotelsData);
        setHotelsLoading(false);

        // Load booking
        const baseUrl =
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
          process.env.BACKEND_BASE_URL;
        const response = await fetch(`${baseUrl}/api/v1/bookings/${bookingId}`);

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            const bookingData = data.data;
            setBooking(bookingData);
            setFormData({
              userName: bookingData.userName || "",
              userId: bookingData.userId || "",
              hotelId: bookingData.hotelId || "",
              hotelName: bookingData.hotelName || "",
              hotelLocation: bookingData.hotelLocation || "",
              checkIn: bookingData.checkIn ? bookingData.checkIn.split("T")[0] : "",
              checkOut: bookingData.checkOut ? bookingData.checkOut.split("T")[0] : "",
              roomCount: bookingData.roomCount || 1,
              guestCount: bookingData.guestCount || 1,
            });
          } else {
            setError("Booking not found");
          }
        } else {
          setError("Failed to load booking");
        }
      } catch (err) {
        console.error("Error loading booking:", err);
        setError("An error occurred while loading the booking");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [bookingId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "roomCount" || name === "guestCount" ? parseInt(value) : value,
    }));

    // Auto-fill hotel information when selected
    if (name === "hotelId") {
      const hotel = hotels.find((h) => h._id === value);
      if (hotel) {
        setFormData((prev) => ({
          ...prev,
          hotelName: hotel.name,
          hotelLocation: `${hotel.district}, ${hotel.province}`,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      // Validate required fields
      if (
        !formData.userName ||
        !formData.userId ||
        !formData.hotelId ||
        !formData.checkIn ||
        !formData.checkOut ||
        !formData.roomCount ||
        !formData.guestCount
      ) {
        setError("Please fill in all required fields");
        setSubmitting(false);
        return;
      }

      // Validate check-out is after check-in
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      if (checkOutDate <= checkInDate) {
        setError("Check-out date must be after check-in date");
        setSubmitting(false);
        return;
      }

      const baseUrl =
        process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
        process.env.BACKEND_BASE_URL;
      const response = await fetch(`${baseUrl}/api/v1/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: formData.userName,
          userId: formData.userId,
          hotelId: formData.hotelId,
          hotelName: formData.hotelName,
          hotelLocation: formData.hotelLocation,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          roomCount: formData.roomCount,
          guestCount: formData.guestCount,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.message || "Failed to update booking. Please try again."
        );
        setSubmitting(false);
        return;
      }

      // Success - redirect to bookings list
      router.push("/admin/bookings");
    } catch (err) {
      console.error("Error updating booking:", err);
      setError("An error occurred. Please try again.");
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/bookings");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--surface-page)] py-8">
        <div className="mx-auto w-[var(--general-width)]">
          <div className="text-center text-[#8a909a]">Loading booking...</div>
        </div>
      </main>
    );
  }

  if (error && !booking) {
    return (
      <main className="min-h-screen bg-[var(--surface-page)]">
        <div className="mx-auto w-[var(--general-width)] py-8">
          <Link href="/admin/bookings" className="text-blue-500 hover:text-blue-600 mb-6 inline-block">
            ← Back to Bookings
          </Link>
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--surface-page)]">
      <div className="mx-auto w-[var(--general-width)] py-8 md:py-12">
        {/* Back Link */}
        <Link href="/admin/bookings" className="text-blue-500 hover:text-blue-600 mb-6 inline-block">
          ← Back to Bookings
        </Link>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-sm border border-[#e5e7eb] p-8 max-w-2xl">
          <h1 className="text-3xl font-bold text-[var(--text-heading)] mb-8">
            Edit Booking
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Name and ID */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                  User Name
                </label>
                <input
                  type="text"
                  name="userName"
                  placeholder="John Doe"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#d6d8dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                  User ID
                </label>
                <input
                  type="text"
                  name="userId"
                  placeholder="user123"
                  value={formData.userId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#d6d8dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Hotel Selection */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                Hotel
              </label>
              {hotelsLoading ? (
                <div className="text-[#8a909a]">Loading hotels...</div>
              ) : (
                <select
                  name="hotelId"
                  value={formData.hotelId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#d6d8dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a hotel</option>
                  {hotels.map((hotel) => (
                    <option key={hotel._id} value={hotel._id}>
                      {hotel.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Check-in and Check-out */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                  Check-in
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#d6d8dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                  Check-out
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#d6d8dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Room Count and Guest Count */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                  Room Count
                </label>
                <input
                  type="number"
                  name="roomCount"
                  min="1"
                  value={formData.roomCount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#d6d8dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                  Guest Count
                </label>
                <input
                  type="number"
                  name="guestCount"
                  min="1"
                  value={formData.guestCount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#d6d8dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button
                type="submit"
                disabled={submitting || hotelsLoading}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {submitting ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="border-t border-[#d6d8dc] py-8 text-center text-xs text-[#8a909a] mt-12">
        © 2028 HotelBook. All rights reserved.
      </footer>
    </main>
  );
}
