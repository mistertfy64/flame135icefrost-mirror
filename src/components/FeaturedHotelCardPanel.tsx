import { fetchTopBookedHotels, formatHotelLocation } from "@/libs/hotelApi";
import Link from "next/link";
import HotelCard from "./HotelCard";

const hotelGradients = [
  "linear-gradient(145deg, #5b3a29 0%, #9f7455 38%, #d8c0a2 100%)",
  "linear-gradient(145deg, #724e3a 0%, #9b7d66 34%, #8ab5ce 67%, #f3be86 100%)",
  "linear-gradient(145deg, #0e2c4b 0%, #1e4b78 28%, #4f7db0 58%, #f0b272 100%)",
];

export default async function FeaturedHotelCardPanel() {
  const featuredHotels = await fetchTopBookedHotels(3);

  return (
    <section className="w-full">
      <div className="mb-4 flex items-center justify-between md:mb-5">
        <h2 className="text-3xl font-semibold text-[var(--text-heading)] md:text-4xl">
          Featured Hotels
        </h2>
        <Link
          href="/hotels"
          className="cursor-pointer text-sm font-medium text-[var(--brand-500)] hover:text-[var(--brand-600)]"
        >
          View All -&gt;
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {featuredHotels.map((hotel, index) => (
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
              background: hotelGradients[index % hotelGradients.length],
            }}
          />
        ))}
      </div>

      <div className="mt-8 rounded-[var(--radius-panel)] bg-[var(--cta-500)] px-4 py-8 text-center text-white md:px-10 md:py-10">
        <h3 className="text-4xl font-semibold leading-tight md:text-5xl">
          Ready to Book Your Next Adventure?
        </h3>
        <p className="mt-2 text-sm text-[#ffe6d1]">
          Create an account to start booking hotels instantly
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button className="cursor-pointer rounded-md bg-black px-6 py-2 text-sm font-medium text-white hover:bg-[#1f1f1f]">
            Register Now
          </button>
          <button className="cursor-pointer rounded-md border border-white px-6 py-2 text-sm font-medium text-white hover:bg-white hover:text-[var(--cta-500)]">
            Login
          </button>
        </div>
      </div>
    </section>
  );
}
