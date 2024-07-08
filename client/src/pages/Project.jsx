import { useLoaderData } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const Project = () => {
  const { project, tasks } = useLoaderData();
  const { ProjectName } = project;

  return (
    <>
      <section className="flex justify-between">
        <h1 className="text-3xl font-bold mb-2">{ProjectName}</h1>
        <div className="flex space-x-4 mb-2">
          <button className="flex items-center text-blue-500">
            <FaEdit className="mr-1" />
          </button>
          <button className="flex items-center text-red-500">
            <FaTrash className="mr-1" />
          </button>
        </div>
      </section>
      <section className="mt-4">
        <form className="flex space-x-4">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded"
            placeholder="Enter task name"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add
          </button>
        </form>
      </section>
      <hr className="my-4" />
      <section>
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
        {tasks.length === 0 && (
          <p className="text-lg text-gray-500">No tasks found</p>
        )}

        <ul className="space-y-2   max-h-80">
          {tasks.map(({ TaskName }, index) => (
            <li
              key={index}
              className="p-2 bg-gray-100 rounded flex justify-between"
            >
              <h3 className="text-lg">{TaskName}</h3>
              <span className="flex">
                <button className="flex items-center text-teal-500">
                  <FaEdit className="mr-2" />
                </button>
                <button className="flex items-center text-orange-500">
                  <FaTrash className="mr-1" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Project;
