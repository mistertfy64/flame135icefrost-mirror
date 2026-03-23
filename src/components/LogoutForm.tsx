"use client";
import { signOut } from "next-auth/react";

export default function LogoutForm() {
  const handleLogout = async () => {
    // signOut handles the redirect automatically with callbackUrl
    await signOut({ callbackUrl: "/" });
  };

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer rounded-md bg-[var(--brand-500)] px-4 py-1 text-[11px] font-semibold text-white hover:bg-[var(--brand-600)]"
    >
      Logout
    </button>
  );
}
