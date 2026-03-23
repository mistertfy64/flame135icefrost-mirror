import Banner from "../components/Banner";
import FeaturedHotelCardPanel from "@/components/FeaturedHotelCardPanel";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--surface-page)]">
      <Banner />

      <main className="mx-auto w-[var(--general-width)] py-8 md:py-10">
        <FeaturedHotelCardPanel />
      </main>

      <footer className="border-t border-[#d6d8dc] py-8 text-center text-xs text-[#8a909a]">
        © 2026 mistertfy64, Meep2447, kaikubEZ
        <br />
        This was made as a submission for an university assignment. This app
        does not make any real bookings.
      </footer>
    </div>
  );
}
