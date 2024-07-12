import { useState, useEffect } from "react";
import { Link, useFetcher } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";

const Signup = () => {
  const fetcher = useFetcher();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting");
    fetcher.submit(
      {
        type: "signup",
        email: email,
        password: password,
      },
      {
        method: "post",
      }
    );
  };

  useEffect(() => {
    if (fetcher.data) {
      setResponseMessage(fetcher.data.message);
    }
  }, [fetcher.data]);

  return (
    <div className="flex-col text-center p-4 mx-auto">
      <h1 className="text-2xl bg-white rounded p-2 shadow-md font-bold mb-2">
        Sign Up
      </h1>
      <form
        className=" bg-white p-8 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <div className="mb-2">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              setResponseMessage("");
            }}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setResponseMessage("");
            }}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          Sign Up
        </button>
        {responseMessage && (
          <p className="flex items-center item-center font-semibold bg-red-50 rounded p-2 text-red-500  text-sm mt-2">
            <FaExclamationCircle className="mr-2" />
            {responseMessage}
          </p>
        )}
      </form>
      <p className="mt-2 text-gray-600 bg-white p-2 rounded shadow-md">
        Don&apos;t have an account?
        <Link to="/login" className="text-blue-500 hover:underline ml-1">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Signup;
