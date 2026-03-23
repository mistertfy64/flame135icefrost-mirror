import getMe from "@/libs/getMe";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import ProfileLogoutButton from "@/components/ProfileLogoutButton";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const me = (await getMe(session?.user.token)) || {};
  const user = me.data || {};

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="flex min-h-[calc(100vh-44px)] flex-col items-center bg-gray-50 py-12">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">My Profile</h1>

      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        {/* Avatar and Name Section */}
        <div className="flex flex-col items-center pb-6">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 text-3xl font-bold text-white">
            {getInitial(user.name)}
          </div>
          <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
          <span className="mt-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
            {user.role === "admin" ? "Administrator" : "User Account"}
          </span>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* User Details Section */}
        <div className="space-y-4 py-6">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-gray-800">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-800">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Telephone</p>
            <p className="text-gray-800">{user.tel || "-"}</p>
          </div>
        </div>

        {/* Logout Button */}
        <ProfileLogoutButton />
      </div>
    </div>
  );
}
