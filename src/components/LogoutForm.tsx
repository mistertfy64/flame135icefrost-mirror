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
    <div className="bg-white w-[37.5%] p-[16px] mt-[8px] rounded-lg shadow-lg">
      <div className="flex flex-col justify-center">
        <button
          onClick={handleLogout}
          className="cursor-pointer rounded-md bg-primary text-white px-[16px] py-[8px] text-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
