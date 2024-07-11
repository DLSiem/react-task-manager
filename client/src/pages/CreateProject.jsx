import { useFetcher } from "react-router-dom";
import { useState } from "react";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const fetcher = useFetcher();
  const handleSubmit = (e) => {
    e.preventDefault();
    fetcher.submit(
      {
        type: "create-project",
        projectName: projectName,
      },
      {
        method: "POST",
      }
    );
    setProjectName("");
  };
  return (
    <div className="">
      <h1 className="text-lg font-bold text-gray-600 text-center p-3">
        CREATE PROJECT
      </h1>
      <form method="post" action="/create-project" onSubmit={handleSubmit}>
        <input
          type="text"
          name="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
          className="p-2 border border-gray-300 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600  text-white px-4 w-full py-1 mt-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
