import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-4xl">Welcome Back!</h1>
      <h2 className="text-md">Login to your account</h2>
      <LoginForm />
    </div>
  );
}
