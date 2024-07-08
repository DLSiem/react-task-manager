import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import propTypes from "prop-types";

const SideBar = ({ projects }) => {
  return (
    <>
      <nav className="bg-gray-200 w-64 p-3 flex flex-col space-y-6 overflow-y-auto rounded-md">
        <h1 className="text-2xl font-bold text-center">Projects</h1>
        <input
          type="text"
          placeholder="Search Projects"
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <section className="mt-4">
          <form className="">
            <input
              type="text"
              placeholder="Create Project"
              className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-2 py-2 hover:bg-blue-700 flex items-center justify-center w-full mt-2"
            >
              <FaPlus className="mr-2" /> Create
            </button>
          </form>
        </section>

        <section>
          <h2 className="text-xl font-semibold">My Projects</h2>
          <ul className="space-y-2">
            {projects.map(({ ProjectId, ProjectName }, index) => (
              <li
                key={index}
                className="p-2 bg-white rounded-md shadow hover:bg-gray-100"
              >
                <NavLink
                  to={`/project/${ProjectId}`}
                  className={({ isActive }) =>
                    isActive ? "underline" : "hover:underline"
                  }
                >
                  {ProjectName}
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      </nav>
    </>
  );
};

SideBar.propTypes = {
  projects: propTypes.arrayOf(
    propTypes.shape({
      ProjectId: propTypes.number,
      ProjectName: propTypes.string,
    })
  ),
};

export default SideBar;
