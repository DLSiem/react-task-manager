import { NavLink, useRouteLoaderData, Form } from "react-router-dom";
const Header = () => {
  const isAuthenticated = useRouteLoaderData("root");
  return (
    <header>
      <nav className="bg-gray-800 p-2">
        <div className="container mx-auto flex justify-between items-center">
          <h1
            className="text-2xl font-bold
            text-white"
          >
            <NavLink to="/" className="text-2xl font-bold text-white">
              TaskMan
            </NavLink>
          </h1>

          <ul className="flex items-center">
            <li className="mx-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-white underline"
                    : "text-white hover:underline"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="mx-2 items-center">
              <NavLink
                to="about"
                className={({ isActive }) =>
                  isActive
                    ? "text-white underline"
                    : "text-white hover:underline"
                }
              >
                About
              </NavLink>
            </li>
            {!isAuthenticated && (
              <>
                <li className="border rounded bg-gray-600 hover:bg-gray-700 px-2 py-1 items-center mx-1">
                  <NavLink
                    to="login"
                    className={({ isActive }) =>
                      isActive ? "text-white font-bold" : "text-white"
                    }
                  >
                    Log In
                  </NavLink>
                </li>
                <li className="border rounded bg-blue-600 hover:bg-blue-700 px-2 py-1 items-center mx-1">
                  <NavLink
                    to="signup"
                    className={({ isActive }) =>
                      isActive ? "text-white font-bold" : "text-white "
                    }
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
            {isAuthenticated && (
              <li className="border rounded bg-red-600 hover:bg-red-700 px-2 py-1 items-center mx-1">
                <Form action="/logout" method="POST">
                  <button className="text-white">Logout</button>
                </Form>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
