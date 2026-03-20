import HotelCard from "./HotelCard";

export default function FeaturedHotelCardPanel() {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <HotelCard
          name="mistertfy64's Hotel"
          location="Equation Playground"
          tel="1234567890"
        />
        <HotelCard
          name="Meep2427's Hotel"
          location="Dream Island, Goiky"
          tel="2427242724"
        />
        <HotelCard
          name="kaikubez's Hotel"
          location="The Grasslands, Goiky"
          tel="1111111111"
        />
      </div>
    </div>
  );
}
