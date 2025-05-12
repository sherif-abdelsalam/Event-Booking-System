const BASE_URL = process.env.REACT_APP_API_URL;

export const login = async (userData) => {
  console.log("Basesdfdf URL:", BASE_URL);

  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return {
    token: data.token,
    user: data.user,
  };
};

export const register = async (userData) => {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return await response.json();
};
