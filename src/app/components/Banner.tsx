import FrontPageSearch from "./FrontPageSearch";

export default function Banner() {
  return (
    <div className="w-full bg-primary flex justify-center items-center h-[30vh]">
      <div className="w-[var(--general-width)] text-white">
        <span className="text-4xl">Find your perfect stay!</span>
        <br />
        <span className="text-xl">
          Book amazing hotels across Thailand with ease!
        </span>
        <br />
        <br />
        <FrontPageSearch />
      </div>
    </div>
  );
}
