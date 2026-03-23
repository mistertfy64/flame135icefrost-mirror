import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getMe from "@/libs/getMe";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);
  const me = (await getMe(session?.user.token)) || {};

  return (
    <header className="w-full border-b border-[#d6d8dc] bg-[var(--surface-header)]">
      <div className="mx-auto flex h-[44px] w-[var(--general-width)] items-center justify-between">
        <div className="text-[13px] font-medium text-[var(--brand-500)]">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="inline-flex h-4 w-4 items-center justify-center text-[var(--brand-500)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
              >
                <path d="M4 20V4a1 1 0 0 1 1-1h9l6 6v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
                <path d="M14 3v6h6" />
                <path d="M8 12h8" />
                <path d="M8 16h5" />
              </svg>
            </span>
            <span>HotelBook</span>
          </Link>
        </div>

        <nav className="flex items-center gap-5 text-[12px] text-[#35404d]">
          <Link className="hover:text-[var(--brand-500)]" href="/hotels">
            Hotels
          </Link>

          <Link className="hover:text-[var(--brand-500)]" href="/login">
            Login
          </Link>

          <Link href="/register">
            <button className="cursor-pointer rounded-md bg-[var(--brand-500)] px-4 py-1 text-[11px] font-semibold text-white hover:bg-[var(--brand-600)]">
              Register
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
