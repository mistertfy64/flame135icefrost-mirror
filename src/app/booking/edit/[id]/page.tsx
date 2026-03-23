"use client";
import {
  fetchAllHotels,
  updateBooking,
  type Hotel,
  type Booking
} from "@/libs/hotelApi";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, SyntheticEvent } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import getDifferenceInDays from "@/app/libs/getDifferenceInDays";

export default function EditBookingPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = params?.id as string;
  const { data: session } = useSession();

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [formData, setFormData] = useState({
    hotelId: "",
    checkInDate: "",
    checkOutDate: "",
    roomCount: 1,
    guestCount: 1
  });

  useEffect(() => {
    const loadData = async () => {
      // Load hotels
      const hotelsData = await fetchAllHotels();
      setHotels(hotelsData);

      // Fetch booking to verify ownership
      if (bookingId && session?.user?.token) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/bookings/${bookingId}`,
            {
              headers: {
                Authorization: `Bearer ${session.user.token}`
              }
            }
          );
          const data = await response.json();

          if (data.success && data.data) {
            const booking = data.data;
            // Check if current user is the owner
            if (booking.user === session.user._id) {
              setIsOwner(true);
              setFormData({
                hotelId: booking.hotelId,
                checkInDate: booking.checkIn.split("T")[0],
                checkOutDate: booking.checkOutDate.split("T")[0],
                roomCount: booking.roomCount,
                guestCount: booking.guestCount
              });
            } else {
              setError("You don't have permission to edit this booking");
            }
          } else {
            setError("Booking not found");
          }
        } catch (err) {
          setError("Failed to load booking");
          console.error(err);
        }
      }
    };
    loadData();
  }, [bookingId, session?.user?.token, session?.user?._id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "roomCount" || name === "guestCount" ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!bookingId) {
      setError("Booking ID not found");
      setLoading(false);
      return;
    }

    if (!isOwner) {
      setError("You don't have permission to edit this booking");
      setLoading(false);
      return;
    }

    if (!formData.hotelId || !formData.checkInDate || !formData.checkOutDate) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    const booking: Booking = {
      hotelId: formData.hotelId,
      checkInDate: formData.checkInDate,
      checkOutDate: formData.checkOutDate,
      nights: getDifferenceInDays(formData.checkInDate, formData.checkOutDate),
      roomCount: formData.roomCount,
      guestCount: formData.guestCount
    };

    const result = await updateBooking(
      bookingId,
      booking,
      session?.user?.token || ""
    );

    if (result.success) {
      router.push("/booking");
    } else {
      setError(result.message || "Failed to update booking");
      setLoading(false);
    }
  };

  if (!isOwner && error) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] py-12">
        <div className="mx-auto w-full max-w-2xl px-4">
          <div className="rounded-2xl border border-white/20 bg-white/95 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.1)] backdrop-blur-sm text-center">
            <p className="text-red-600 font-semibold mb-4">{error}</p>
            <Link href="/booking">
              <button className="rounded-lg bg-[var(--brand-500)] px-6 py-2 text-sm font-semibold text-white hover:bg-[var(--brand-600)]">
                Back to Bookings
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-12">
      <div className="mx-auto w-full max-w-2xl px-4">
        <div className="rounded-2xl border border-white/20 bg-white/95 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.1)] backdrop-blur-sm">
          <h1 className="mb-8 text-2xl font-bold text-[var(--text-heading)]">
            Edit Booking
          </h1>

          {error && (
            <div className="mb-6 rounded-lg bg-red-100 p-4 text-sm text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                Select Hotel *
              </label>
              <select
                name="hotelId"
                value={formData.hotelId}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#d6d8dc] bg-white px-4 py-3 text-sm focus:border-[var(--brand-500)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-500)]/30"
                required
              >
                <option value="">Choose a hotel...</option>
                {hotels.map((hotel) => (
                  <option key={hotel._id} value={hotel._id}>
                    {hotel.name} - {hotel.district}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                  Check-in Date *
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkInDate}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#d6d8dc] bg-white px-4 py-3 text-sm focus:border-[var(--brand-500)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-500)]/30"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                  Check-out Date *
                </label>
                <input
                  type="date"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#d6d8dc] bg-white px-4 py-3 text-sm focus:border-[var(--brand-500)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-500)]/30"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                  Number of Rooms *
                </label>
                <input
                  type="number"
                  name="roomCount"
                  value={formData.roomCount}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full rounded-lg border border-[#d6d8dc] bg-white px-4 py-3 text-sm focus:border-[var(--brand-500)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-500)]/30"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                  Number of Guests *
                </label>
                <input
                  type="number"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full rounded-lg border border-[#d6d8dc] bg-white px-4 py-3 text-sm focus:border-[var(--brand-500)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-500)]/30"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading || !isOwner}
                className="flex-1 rounded-lg bg-[linear-gradient(180deg,#1da2df_0%,#148bc2_100%)] py-3 text-sm font-semibold text-white hover:shadow-lg disabled:opacity-50 transition"
              >
                {loading ? "Updating..." : "Update Booking"}
              </button>
              <Link href="/booking" className="flex-1">
                <button
                  type="button"
                  className="w-full rounded-lg border border-[#d6d8dc] py-3 text-sm font-semibold text-[#35404d] hover:bg-[#f5f5f5] transition"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
