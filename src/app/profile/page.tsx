import getMe from "@/libs/getMe";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const me = (await getMe(session?.user.token)) || {};

  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-4xl">My Profile</h1>
      <div className="bg-white w-[37.5%] p-[16px] mt-[8px] rounded-lg shadow-lg">
        <div className="flex flex-col justify-center">
          <div className="px-[4px] py-[16px]">
            <p className="text-lg">
              {me.data.role === "admin" ? "Administrator" : ""}
            </p>
            <p className="text-3xl">{me.data.name}</p>
            <p className="text-text-secondary">Joined on {me.data.createdAt}</p>
          </div>
          <hr />
          <div className="py-[8px]">
            <ul>
              <li className="px-[4px]">E-mail Address: {me.data.email}</li>
              <li className="px-[4px]">Phone Number: {me.data.tel}</li>
            </ul>
          </div>
          <hr />
          <div>
            <Link className="px-[4px] text-primary underline" href="/logout">
              Log out?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
