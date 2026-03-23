"use client";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function LogoutForm() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });

    router.push("/");
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
