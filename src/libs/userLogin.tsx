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

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.msg);
  }

  return result;
}
