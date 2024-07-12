import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex flex-col items-center  bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <form className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-700">
          Sign Up
        </button>
        <p className="mt-4 text-gray-600">
          Already have an account?
          <Link to="/login" className="text-blue-500 hover:underline ml-1">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
