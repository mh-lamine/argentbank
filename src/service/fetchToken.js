async function fetchToken(email, password) {
  const loginUrl = "http://localhost:3001/api/v1/user/login";

  const loginPayload = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server response:", errorData);
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.body.token;
  } catch (error) {
    console.error("Failed to fetch token:", error);
    throw error;
  }
}

export default fetchToken;