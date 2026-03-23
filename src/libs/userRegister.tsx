export default async function userRegister(
  fullName: string,
  userEmail: string,
  userPassword: string,
  phoneNumber: string
) {
  const data = {
    name: fullName,
    email: userEmail,
    password: userPassword,
    role: "user",
    tel: phoneNumber
  };

  const API_BASE_URL =
    process.env.BACKEND_BASE_URL ||
    "https://flame135icefrost-backend.vercel.app";
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  return result;
}
