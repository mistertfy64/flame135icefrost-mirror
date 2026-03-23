"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", { email, password });

    if (result?.error) {
      setLoading(false);
      return;
    }

    router.push("/");
  };

  return (
    <form
      onSubmit={handleLogin}
      className="rounded-2xl border border-white/20 bg-white/95 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.1)] backdrop-blur-sm"
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full rounded-lg border border-[#d6d8dc] bg-white px-4 py-3 text-sm placeholder:text-[#9aa1ab] focus:border-[var(--brand-500)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-500)]/30"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg border border-[#d6d8dc] bg-white px-4 py-3 text-sm placeholder:text-[#9aa1ab] focus:border-[var(--brand-500)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-500)]/30"
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-[#d6d8dc]" />
            <span className="text-[#8a909a]">Remember me</span>
          </label>
          <Link href="#" className="text-[var(--brand-500)] hover:text-[var(--brand-600)]">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[linear-gradient(180deg,#1da2df_0%,#148bc2_100%)] py-3 text-sm font-semibold text-white hover:shadow-lg disabled:opacity-50 transition"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>

      <div className="mt-6 border-t border-[#e8eaed] pt-6 text-center">
        <p className="text-sm text-[#8a909a]">
          Don&#39;t have an account?{" "}
          <Link href="/register" className="font-medium text-[var(--brand-500)] hover:text-[var(--brand-600)]">
            Create one
          </Link>
        </p>
      </div>
    </form>
  );
}
