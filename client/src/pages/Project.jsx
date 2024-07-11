import { useState } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import { FaEdit, FaTrash, FaUpload } from "react-icons/fa";
import Tasks from "./Tasks";

const Project = () => {
  const { project, tasks } = useLoaderData();
  const [isEdit, setIsEdit] = useState(false);
  const [ProjectName, setProjectName] = useState(project.ProjectName);
  const fetcher = useFetcher();

  return (
    <>
      <section className="flex justify-between">
        {!isEdit && <h1 className="text-3xl font-bold mb-2">{ProjectName}</h1>}
        {isEdit ? (
          <form
            method="post"
            action="/update-project"
            className="flex flex-1 justify-between space-x-4 mr-2"
            onSubmit={(e) => {
              e.preventDefault();
              fetcher.submit(
                {
                  type: "update-project",
                  projectName: ProjectName,
                  projectId: project.ProjectId,
                },
                {
                  method: "PATCH",
                }
              );
              setIsEdit(false);
            }}
          >
            <input
              type="text"
              name="projectName"
              defaultValue={ProjectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="text-3xl font-bold  p-1 border border-gray-300 rounded flex-1"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              <FaUpload />
            </button>
          </form>
        ) : null}
        <div className="flex space-x-4 ml-2 ">
          {!isEdit && (
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
              onClick={() => setIsEdit(true)}
            >
              <FaEdit />
            </button>
          )}

          <button
            className=" bg-red-700 text-white px-4 py-1 rounded"
            onClick={() => {
              fetcher.submit(
                {
                  type: "delete-project",
                  projectId: project.ProjectId,
                },
                {
                  method: "DELETE",
                }
              );
            }}
          >
            <FaTrash />
          </button>
        </div>
      </section>
      <Tasks tasks={tasks} />
    </>
  );
};

export default Project;
