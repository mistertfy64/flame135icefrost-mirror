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
      className="flex cursor-pointer items-center gap-1 rounded-md bg-[var(--brand-500)] px-3 py-1 text-[11px] font-semibold text-white hover:bg-[var(--brand-600)]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3 w-3"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
      Logout
    </button>
  );
}
