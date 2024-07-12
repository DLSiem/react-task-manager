import { refreshAccessToken } from "./actions/authactions";

export const isAuthenticated = async () => {
  let token = localStorage.getItem("token");

  if (!token) {
    console.log(false);
    return false;
  }
  try {
    const response = await fetch(`http://localhost:4000/protected`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    // refresh token if token expires
    if (response.status === 401) {
      console.log("Token expired. Refreshing token...");
      const refreshResponse = await refreshAccessToken();
      if (refreshResponse) {
        console.log("Token refreshed successfully");
        return true;
      }
      return false;
    }
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.error("Authentication check failed:", error);
  }

  return false;
};
