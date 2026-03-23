export default async function getMe(token: string) {
  const API_BASE_URL = process.env.BACKEND_BASE_URL;

  const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    return {};
  }

  return await response.json();
}
