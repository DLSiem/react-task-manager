export const isAuthenticated = async () => {
  const token = localStorage.getItem("token");

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

    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.error("Authentication check failed:", error);
  }

  return false;
};
