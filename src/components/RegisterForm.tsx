"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import userRegister from "@/libs/userRegister";

export default function RegisterForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await userRegister(fullName, email, password, tel);
      router.push("/login?registered=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="rounded-2xl border border-white/20 bg-white/95 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.1)] backdrop-blur-sm"
    >
      <div className="space-y-5">
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="w-full rounded-lg border border-[#d6d8dc] bg-white px-4 py-3 text-sm placeholder:text-[#9aa1ab] focus:border-[var(--brand-500)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-500)]/30"
            required
          />
        </div>

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
            Phone Number
          </label>
          <input
            type="tel"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            placeholder="+66 8XXXX XXXX"
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

        <div>
          <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg border border-[#d6d8dc] bg-white px-4 py-3 text-sm placeholder:text-[#9aa1ab] focus:border-[var(--brand-500)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-500)]/30"
            required
          />
        </div>

        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded border-[#d6d8dc] mt-0.5" required />
          <span className="text-xs text-[#8a909a]">
            I agree to the <span className="font-medium">Terms of Service</span> and{" "}
            <span className="font-medium">Privacy Policy</span>
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[linear-gradient(180deg,#1da2df_0%,#148bc2_100%)] py-3 text-sm font-semibold text-white hover:shadow-lg disabled:opacity-50 transition"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </div>

      <div className="mt-6 border-t border-[#e8eaed] pt-6 text-center">
        <p className="text-sm text-[#8a909a]">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[var(--brand-500)] hover:text-[var(--brand-600)]">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}
