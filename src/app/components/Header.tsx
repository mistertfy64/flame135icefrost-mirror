import Link from "next/link";

export default function TopMenu() {
  return (
    <header className="w-full flex justify-center ">
      <div className="w-[var(--general-width)] bg-white h-[4vh] flex justify-between items-center">
        <div>
          <Link href="/">Group135</Link>
        </div>
        <div>
          <Link className="mx-[8px]" href="/hotels">
            Hotels
          </Link>
          <Link
            className="mx-[8px] text-primary underline cursor-pointer"
            href="/login"
          >
            Login
          </Link>
          {/** TODO: Make this more consistent? */}
          <Link className="ml-[8px] text-text-primary " href="/register">
            <button className="cursor-pointer rounded-md bg-primary text-text px-[16px] py-[4px]">
              Register
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
