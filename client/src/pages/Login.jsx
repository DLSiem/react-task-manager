import { Link, useFetcher } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetcher = useFetcher();

  const handleSubmit = (e) => [
    e.preventDefault(),
    fetcher.submit(
      {
        type: "login",
        email: email,
        password: password,
      },
      {
        method: "post",
      }
    ),
  ];
  return (
    <div className="flex-col text-center p-4 mx-auto">
      <h1 className="text-2xl bg-white rounded p-2 shadow-md font-bold mb-2">
        Log In
      </h1>
      <form
        className=" bg-white p-8 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <div className="mb-2">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          Log In
        </button>
      </form>
      <p className="mt-2 text-gray-600 bg-white p-2 rounded shadow-md">
        Don&apos;t have an account?
        <Link to="/signup" className="text-blue-500 hover:underline ml-1">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
