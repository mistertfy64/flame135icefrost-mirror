"use client";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    const result = await signIn("credentials", { email, password });

    if (result?.error) {
      router.push("/login");
      return;
    }

    router.push("/");
  };

  return (
    <div className="bg-white w-[37.5%] p-[16px] mt-[8px] rounded-lg shadow-lg">
      <div className="flex flex-col justify-center">
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
          label="Password"
          name="password"
          variant="outlined"
          size="small"
          className="w-full"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <button
          onClick={handleLogin}
          className="cursor-pointer rounded-md bg-primary text-white px-[16px] py-[8px] text-lg"
        >
          Login
        </button>
        <span className="mt-[4px] text-sm text-center">
          Don&#39;t have an account? &nbsp;
          <Link className="text-primary underline" href="/login">
            Register here!
          </Link>
        </span>
      </div>
    </div>
  );
}
