import { useFetcher, useLoaderData } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Tasks from "./Tasks";

const Project = () => {
  const { project, tasks } = useLoaderData();
  const fetcher = useFetcher();
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
      <Tasks tasks={tasks} />
    </>
  );
};

export default Project;
