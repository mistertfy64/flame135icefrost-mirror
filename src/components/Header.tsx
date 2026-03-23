import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);

  return (
    <header className="w-full flex justify-center py-[4px] bg-white">
      <div className="w-[var(--general-width)] h-[4vh] flex justify-between items-center">
        <div>
          <Link href="/">Group135</Link>
        </div>
        {session ? (
          <div>
            <Link className="mx-[8px] underline" href="/hotels">
              Hotels
            </Link>
            <Link
              className="mx-[8px] text-primary underline cursor-pointer"
              href="/logout"
            >
              Logout
            </Link>
            <Link
              className="mx-[8px] text-primary underline cursor-pointer"
              href="/me"
            >
              {"Unknown User Name"}
            </Link>
            <Link className="ml-[8px] text-text-primary " href="/register">
              <button className="cursor-pointer rounded-md bg-primary text-text px-[16px] py-[4px]">
                My Bookings
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <Link className="mx-[8px] underline" href="/hotels">
              Hotels
            </Link>
            <Link
              className="mx-[8px] text-primary underline cursor-pointer"
              href="/login"
            >
              Login
            </Link>
            <Link className="ml-[8px] text-text-primary " href="/register">
              <button className="cursor-pointer rounded-md bg-primary text-text px-[16px] py-[4px]">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
