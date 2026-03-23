import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-4xl">Create Account</h1>
      <h2 className="text-md">Join us to start booking hotels!</h2>
      <RegisterForm />
    </div>
  );
}
