import { Form } from "react-router-dom";

const CreateProject = () => {
  return (
    <div className="">
      <h1 className="text-lg font-bold text-gray-600 text-center p-3">
        CREATE PROJECT
      </h1>
      <Form method="post" action="/create-project" className="">
        <input
          type="text"
          name="projectName"
          placeholder="Enter project name"
          className="p-2 border border-gray-300 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600  text-white px-4 w-full py-1 mt-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </Form>
    </div>
  );
};

export default CreateProject;
