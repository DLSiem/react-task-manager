import { json, redirect } from "react-router-dom";

export const authActions = async ({ request }) => {
  console.log("authActions");
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
      console.log("response:", response);
      // status code
      console.log("status code", response.status);
      const data = await response.json();
      console.log("response data:", data);
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
      console.log("login");
      break;
    }
  }
  return null;
};
