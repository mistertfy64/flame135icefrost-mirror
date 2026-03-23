"use client";
import { useRouter, useSearchParams } from "next/navigation";
import userRegister from "@/libs/userRegister";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";

export default function RegisterForm() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegister = async (event: SyntheticEvent) => {
    event.preventDefault();
    const result = await userRegister(fullName, email, phoneNumber, password);

    if (!result.success) {
      router.push(`/register?error=${encodeURI("Failed to register.")}`);
      return;
    }

    router.push(`/login`);
  };

  return (
    <div className="bg-white w-[37.5%] p-[16px] mt-[8px] rounded-lg shadow-lg">
      <div className="flex flex-col justify-center">
        <TextField
          id="outlined-basic"
          label="Full Name"
          name="fullName"
          variant="outlined"
          size="small"
          className="w-full"
          onChange={(event) => setFullName(event.target.value)}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="E-mail Address"
          name="email"
          variant="outlined"
          size="small"
          className="w-full"
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Phone Number"
          name="tel"
          variant="outlined"
          size="small"
          className="w-full"
          type="tel"
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Password"
          name="password"
          variant="outlined"
          size="small"
          className="w-full"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <span className="py-[2px] text-red-400">{errorMessage ?? <br />}</span>
        <button
          onClick={handleRegister}
          className="cursor-pointer rounded-md bg-primary text-white px-[16px] py-[8px] text-lg"
        >
          Register
        </button>
        <span className="mt-[4px] text-sm text-center">
          Already have an account?{" "}
          <Link className="text-primary underline" href="/login">
            Login here!
          </Link>
        </span>
      </div>
    </div>
  );
}
