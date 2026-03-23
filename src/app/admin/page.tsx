import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import Link from "next/link";
import { getAllHotels, getAllBookings } from "@/libs/adminApi";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token || "";

  const [hotelsResult, bookingsResult] = await Promise.all([
    getAllHotels(token),
    getAllBookings(token)
  ]);

  const hotels = hotelsResult.data || [];
  const bookings = bookingsResult.data || [];
  const recentBookings = bookings.slice(0, 5);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="min-h-[calc(100vh-44px)] bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Manage hotels, bookings, and monitor system activity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <svg
                  className="h-6 w-6 text-blue-500"
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
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {hotels.length}
                </p>
                <p className="text-sm text-gray-500">Total Hotels</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <svg
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {bookings.length}
                </p>
                <p className="text-sm text-gray-500">Total Bookings</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <svg
                  className="h-6 w-6 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {new Set(bookings.map((b) => b.user?._id)).size}
                </p>
                <p className="text-sm text-gray-500">
                  Total Users with Bookings
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                <svg
                  className="h-6 w-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {
                    bookings.filter(
                      (b) => new Date(b.checkInDate) >= new Date()
                    ).length
                  }
                </p>
                <p className="text-sm text-gray-500">Active Bookings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/admin/hotels"
            className="flex items-center gap-4 rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500">
              <svg
                className="h-6 w-6 text-white"
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
            <div>
              <p className="font-semibold text-gray-800">Manage Hotels</p>
              <p className="text-sm text-gray-500">
                Add, edit, or remove hotels
              </p>
            </div>
            <svg
              className="ml-auto h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          <Link
            href="/admin/bookings"
            className="flex items-center gap-4 rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-800">All Bookings</p>
              <p className="text-sm text-gray-500">
                View and manage all bookings
              </p>
            </div>
            <svg
              className="ml-auto h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Recent Bookings */}
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Bookings
            </h2>
            <Link
              href="/admin/bookings"
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-xs uppercase text-gray-500">
                  <th className="pb-3 font-medium">User</th>
                  <th className="pb-3 font-medium">Hotel</th>
                  <th className="pb-3 font-medium">Check-in</th>
                  <th className="pb-3 font-medium">Nights</th>
                  <th className="pb-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentBookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-8 text-center text-sm text-gray-500"
                    >
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  recentBookings.map((booking) => (
                    <tr key={booking._id} className="text-sm">
                      <td className="py-3">
                        <div className="font-medium text-gray-800">
                          {booking.user?.name || "Unknown"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {booking.user?.email}
                        </div>
                      </td>
                      <td className="py-3 text-gray-600">
                        {booking.hotel?.name || "Unknown"}
                      </td>
                      <td className="py-3 text-gray-600">
                        {formatDate(booking.checkInDate)}
                      </td>
                      <td className="py-3 text-gray-600">{booking.nights}</td>
                      <td className="py-3 text-gray-600">
                        {formatDate(booking.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
