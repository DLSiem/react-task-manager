import { json, redirect } from "react-router-dom";

export const authActions = async ({ request }) => {
  const formData = await request.formData();
  const { type, email, password } = Object.fromEntries(formData);

  switch (type) {
    case "signup": {
      const response = await fetch(`http://localhost:4000/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 201) {
        return redirect("/login");
      } else if (response.status === 400) {
        return json({ message: data.message });
      } else if (response.status === 500) {
        return json({ message: data.message });
      }
      break;
    }
    case "login": {
      const response = await fetch(`http://localhost:4000/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // send cookies
      });

      const data = await response.json();

      if (response.status === 400) {
        return json({ message: data.message });
      }
      if (response.status === 200) {
        let { token } = data;
        localStorage.setItem("token", token);
        return redirect("/");
      }
      break;
    }
  }
  return null;
};

export const logout = async () => {
  localStorage.removeItem("token");
  return redirect("/login");
};

export const refreshAccessToken = async () => {
  const response = await fetch(`http://localhost:4000/refreshtoken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // send cookies
  });

  if (response.status === 200) {
    const data = await response.json();
    const { token } = data;
    localStorage.setItem("token", token);
    return true;
  }
  return false;
};
