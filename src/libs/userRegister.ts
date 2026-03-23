export default async function userRegister(
  name: string,
  email: string,
  password: string,
  tel: string
) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      tel,
      role: "user",
    }),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Registration failed");
  }

  return result;
}
