"use client";

import TextField from "@mui/material/TextField";
import Link from "next/link";

export default function RegisterForm() {
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
        />
        <br />
        <button className="cursor-pointer rounded-md bg-primary text-white px-[16px] py-[8px] text-lg">
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
