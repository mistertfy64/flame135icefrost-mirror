export default async function userLogin(
  userEmail: string,
  userPassword: string
) {
  const data = {
    email: userEmail,
    password: userPassword
  };

  const API_BASE_URL = process.env.BACKEND_BASE_URL;
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  // TODO: Give a reason to the user?
  if (!response.ok) {
    throw new Error("Failed to log in.");
  }

  return await response.json();
}
