import FrontPageSearch from "./FrontPageSearch";

export default function Banner() {
  return (
    <section className="flex min-h-[360px] w-full items-center bg-gradient-to-r from-[var(--hero-start)] to-[var(--hero-end)]">
      <div className="mx-auto w-[var(--general-width)] py-14 text-white">
        <h1 className="text-4xl font-bold leading-tight text-[#ffd160] md:text-6xl">
          Find Your Perfect Stay!!
        </h1>
        <h2 className="mt-4 text-lg text-[#d7f0ff] md:text-2xl">
          Book amazing hotels across Thailand with ease
        </h2>
        <div className="mt-6 md:max-w-[680px]">
        <FrontPageSearch />
        </div>
      </div>
    </section>
  );
}
