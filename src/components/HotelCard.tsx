import Image from "next/image";

interface HotelProp {
  name?: string;
  // TODO: Actual backend might have different `location`
  location?: string;
  tel?: string;
  imageURL?: string;
}

export default function HotelCard(props: HotelProp) {
  return (
    <div className="w-[30%] shadow-lg rounded-lg bg-white">
      <div className="w-full h-[250px] relative rounded-t-lg">
        <Image
          src={props.imageURL ?? "/no-image-data.png"}
          alt={props.imageURL ? "Hotel picture" : "No image for hotel"}
          fill={true}
          className="object cover rounded-t-lg"
        ></Image>
      </div>
      <div className="px-[12px] py-[4px]">
        <div className="text-black text-xl">{props.name}</div>
        <div className="text-text-secondary text-md">{props.location}</div>
        <div className="text-text-secondary text-md">{props.tel}</div>
        <div className="my-[4px]">
          <button className="cursor-pointer w-full py-[4px] bg-primary text-white rounded-lg">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
