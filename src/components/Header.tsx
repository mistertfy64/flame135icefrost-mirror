import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getMe from "@/libs/getMe";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);
  const me = (await getMe(session?.user.token)) || {};

  return (
    <header className="w-full flex justify-center py-[4px] bg-white">
      <div className="w-[var(--general-width)] sm:[8vh]  md:h-[4vh] flex justify-between items-center">
        <div>
          <Link href="/">Group135</Link>
        </div>
        {session ? (
          <div className="flex flex-col md:flex-row items-end md:items-center">
            <Link className="ml-[8px] underline" href="/hotels">
              Hotels
            </Link>
            <Link
              className="ml-[8px] text-primary underline cursor-pointer"
              href="/logout"
            >
              Logout
            </Link>
            <Link
              className="ml-[8px] text-primary underline cursor-pointer"
              href="/profile"
            >
              {me.data.name}
            </Link>
            <Link className="ml-[8px] text-text-primary " href="/register">
              <button className="cursor-pointer rounded-md bg-primary text-text px-[16px] py-[4px]">
                My Bookings
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-end md:items-center">
            <Link className="ml-[8px] underline" href="/hotels">
              Hotels
            </Link>
            <Link
              className="ml-[8px] text-primary underline cursor-pointer"
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
