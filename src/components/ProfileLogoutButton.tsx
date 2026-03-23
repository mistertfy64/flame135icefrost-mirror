"use client";
import { signOut } from "next-auth/react";

export default function ProfileLogoutButton() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full cursor-pointer rounded-lg bg-red-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-600"
    >
      Logout
    </button>
  );
}
