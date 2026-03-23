import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import DeleteBookingButton from "@/components/DeleteBookingButton";
import { getMyBookings } from "@/libs/hotelApi";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function BookingPage() {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token || "";

  const ONE_DAY = 1000 * 60 * 60 * 24;

  const bookingsResponse = await getMyBookings(token);
  const bookings = bookingsResponse.success ? bookingsResponse.data || [] : [];

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8">
      <div className="mx-auto w-[var(--general-width)] max-w-6xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[var(--text-heading)]">
            My Bookings
          </h1>
          <Link href="/booking/create">
            <button className="rounded-lg bg-[var(--brand-500)] px-6 py-2 text-sm font-semibold text-white hover:bg-[var(--brand-600)]">
              + New Booking
            </button>
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center">
            <p className="text-[#8a909a]">
              No bookings yet. Create your first booking!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="rounded-lg border border-[#d6d8dc] bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[var(--text-heading)]">
                      {booking.hotel?.name || "Hotel Booking"}
                    </h3>
                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm text-[#8a909a]">
                      <div>
                        <span className="font-medium">Check-in:</span>{" "}
                        {new Date(booking.checkInDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Check-out:</span>{" "}
                        {new Date(
                          new Date(booking.checkInDate).getTime() +
                            booking.nights * ONE_DAY
                        ).toLocaleDateString()}
                      </div>
                    </div>
                    {booking.status && (
                      <div className="mt-3">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/booking/edit/${booking._id}`}>
                      <button className="rounded-md border border-[var(--brand-500)] px-4 py-2 text-sm font-semibold text-[var(--brand-500)] hover:bg-[var(--brand-500)] hover:text-white transition">
                        Edit
                      </button>
                    </Link>
                    <DeleteBookingButton bookingId={booking._id!} />
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
