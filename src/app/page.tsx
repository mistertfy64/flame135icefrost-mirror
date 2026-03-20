import Banner from "../components/Banner";
import FeaturedHotelCardPanel from "@/components/FeaturedHotelCardPanel";

export default function Home() {
  return (
    <div>
      <Banner />
      <br />
      <div className="w-full flex justify-center">
        <div className="w-[var(--general-width)]">
          <FeaturedHotelCardPanel />
        </div>
      </div>
    </div>
  );
}
