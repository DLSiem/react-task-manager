import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1
            className="text-2xl font-bold
            text-white"
          >
            TaskMan
          </h1>

          <ul className="flex">
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
            <li className="mx-2">
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
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
