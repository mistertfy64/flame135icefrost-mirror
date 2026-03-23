import RegisterForm from "@/components/RegisterForm";

export default function Register() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--surface-page)]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0c8fd0_0%,#0a5bb7_100%)] opacity-5" />
      <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-[#1da2df]/10 blur-3xl" />
      <div className="absolute -left-40 -bottom-40 h-80 w-80 rounded-full bg-[#f98a2c]/10 blur-3xl" />

      <div className="relative w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[var(--text-heading)] mb-2">
            Create Account
          </h1>
          <p className="text-[#8a909a] text-lg">
            Join us to start booking amazing hotels
          </p>
        </div>

        <RegisterForm />
      </div>
    </main>
  );
}
