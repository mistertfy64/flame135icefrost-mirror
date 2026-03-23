export default async function userRegister(
  fullName: string,
  userEmail: string,
  phoneNumber: string,
  userPassword: string
) {
  const data = {
    name: fullName,
    email: userEmail,
    password: userPassword,
    role: "user",
    tel: phoneNumber
  };

  const API_BASE_URL =
    process.env.BACKEND_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  console.log("Registration result:", result);
  return result;
}
