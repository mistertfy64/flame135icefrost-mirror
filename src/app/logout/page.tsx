"use client";

import LogoutForm from "@/components/LogoutForm";

export default function LogoutButton() {
  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-4xl">Log Out</h1>
      <h2 className="text-md">
        Press the button below to log out of your account.
      </h2>
      <LogoutForm />
    </div>
  );
}
