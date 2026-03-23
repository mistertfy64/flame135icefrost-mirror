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

  // Trim token to remove any whitespace
  const token = result.token?.trim();
  if (!token) {
    throw new Error("No token received from login");
  }

  // Fetch user profile to get role and other details
  const meResponse = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const meResult = await meResponse.json();

  if (!meResult.success) {
    throw new Error(meResult.msg || "Failed to fetch user profile");
  }

  // Return combined data with user profile and token
  return {
    _id: meResult.data._id,
    name: meResult.data.name,
    email: meResult.data.email,
    role: meResult.data.role,
    token: token
  };
}
