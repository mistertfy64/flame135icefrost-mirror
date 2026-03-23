"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  getAllBookings,
  updateBooking,
  deleteBooking,
  Booking,
} from "@/libs/adminApi";

export default function AdminBookingsPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [formData, setFormData] = useState({ checkInDate: "", nights: 1 });
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const token = session?.user?.token || "";

  useEffect(() => {
    if (token) {
      loadBookings();
    }
  }, [token]);

  const loadBookings = async () => {
    setLoading(true);
    const result = await getAllBookings(token);
    if (result.success && result.data) {
      setBookings(result.data);
    }
    setLoading(false);
  };

  const handleOpenEdit = (booking: Booking) => {
    setEditingBooking(booking);
    setFormData({
      checkInDate: booking.checkInDate.split("T")[0],
      nights: booking.nights,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBooking) return;

    setSubmitting(true);

    const result = await updateBooking(
      editingBooking._id,
      {
        checkInDate: new Date(formData.checkInDate).toISOString(),
        nights: formData.nights,
      },
      token
    );

    if (result.success) {
      await loadBookings();
      setShowModal(false);
    } else {
      alert(result.message || "Failed to update booking");
    }

    setSubmitting(false);
  };

  const handleDelete = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    setDeletingId(bookingId);
    const result = await deleteBooking(bookingId, token);
    if (result.success) {
      setBookings(bookings.filter((b) => b._id !== bookingId));
    } else {
      alert(result.message || "Failed to delete booking");
    }
    setDeletingId(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-44px)] bg-gray-50 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center text-gray-500">Loading bookings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-44px)] bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
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
              All Bookings
            </h1>
            <p className="text-sm text-gray-500">
              {bookings.length} bookings in the system
            </p>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Hotel
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Check-in
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Nights
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Created
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {booking._id.slice(-6)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.user?.name || "Unknown"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {booking.user?.email}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {booking.hotel?.name || "Unknown Hotel"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {formatDate(booking.checkInDate)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {booking.nights}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {formatDate(booking.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleOpenEdit(booking)}
                          className="mr-2 rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(booking._id)}
                          disabled={deletingId === booking._id}
                          className="rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
                        >
                          {deletingId === booking._id ? "..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && editingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Edit Booking
            </h2>
            <div className="mb-4 rounded-lg bg-gray-50 p-3">
              <p className="text-sm font-medium text-gray-800">
                {editingBooking.hotel?.name}
              </p>
              <p className="text-xs text-gray-500">
                Guest: {editingBooking.user?.name} ({editingBooking.user?.email})
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-gray-600">
                  Check-in Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.checkInDate}
                  onChange={(e) =>
                    setFormData({ ...formData, checkInDate: e.target.value })
                  }
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">
                  Number of Nights (1-3)
                </label>
                <select
                  value={formData.nights}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nights: parseInt(e.target.value),
                    })
                  }
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value={1}>1 night</option>
                  <option value={2}>2 nights</option>
                  <option value={3}>3 nights</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
                >
                  {submitting ? "Saving..." : "Update Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
