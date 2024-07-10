import { useRef, useState } from "react";
import {
  Form,
  useRouteLoaderData,
  useFetcher,
  useSubmit,
} from "react-router-dom";
import { FaEdit, FaPlus, FaTrash, FaSave } from "react-icons/fa";
const Tasks = () => {
  const [method, setMethod] = useState("post");
  const tasks = useRouteLoaderData("tasks");
  //   console.log("tasks", tasks);
  const taskNameRef = useRef(null);
  const submit = useSubmit("tasks");
  const fetcher = useFetcher();

  //   const submit = (event) => {
  //     event.preventDefault();
  //     const form = event.target;
  //     const formData = new FormData(form);
  //     console.log("formData", formData);
  //   };
  //   const { tasks } = useLoaderData();
  //   const fetcher = useFetcher()

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const form = event.target;
  //     // const formData = new FormData(form);
  //     // console.log("formData", formData);
  //     console.log("form", form);
  //     // console.log("form.action", form.action);
  //     // console.log("form.method", form.method);
  //     // const data = Object.fromEntries(formData.entries());
  //     // console.log("data", data);
  //     submit(form);
  //     form.reset();
  //   };
  //   const handleCreateTask = (event) => {
  //     event.preventDefault();
  //     const form = event.target;
  //     console.log("form", form);
  //     // console.log("formData", formData);
  //     submit(form);
  //     form.reset();
  //   };
  //   const handleDeleteTask = (event) => {
  //     event.preventDefault();
  //     const form = event.target;
  //     console.log("form", form);
  //     // console.log("formData", formData);
  //     submit(form);
  //     form.reset();
  //   };

  return (
    <>
      <section className="mt-4">
        {method === "post" && (
          <Form
            method={method}
            className="flex space-x-4"
            //   onSubmit={handleCreateTask}
          >
            <input
              type="text"
              ref={taskNameRef}
              name="taskName"
              className="flex-grow p-2 border border-gray-300 rounded"
              placeholder="Enter task name"
            />
            <button
              type="submit"
              className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 `}
            >
              <FaPlus className="m-1" />
            </button>
          </Form>
        )}
      </section>
      <hr className="my-4" />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
        {tasks.length === 0 && (
          <p className="text-lg text-gray-500">No tasks found</p>
        )}

        <ul className="space-y-2">
          {tasks.map(({ TaskName }, index) => (
            <li
              key={index}
              className="p-2 bg-gray-100 rounded flex justify-between"
            >
              <Task
                taskName={TaskName}
                onEdit={() => setMethod("patch")}
                onDelete={() => setMethod("delete")}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

// Tasks.propTypes = {
//   tasks: propTypes.arrayOf(
//     propTypes.shape({
//       TaskId: propTypes.number,
//       ProjectId: propTypes.number,
//       TaskName: propTypes.string,
//       Status: propTypes.string,
//     })
//   ),
// };

export default Tasks;
import { taskActions } from "../utils/actions/projectactions";

const Task = ({ taskName, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const submit = useSubmit("tasks");
  let taskContent;

  const handleEdit = (event) => {
    event.preventDefault();
    const form = event.target;
    console.log("form", form);
    taskActions({ request: form });
    setIsEditing(false);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const form = event.target;
    console.log("form", form);
    submit(form);
  };

  if (isEditing) {
    taskContent = (
      <Form className="w-full flex" onSubmit={handleEdit}>
        <input
          type="text"
          defaultValue={taskName}
          className="flex-grow text-lg  border border-gray-300 rounded mr-2"
        />
        <button
          className="flex items-center text-blue-500"
          onClick={() => setIsEditing(false)}
        >
          <FaSave className="mr-2" />
        </button>
      </Form>
    );
  } else {
    taskContent = (
      <div className="flex justify-between w-full">
        <h3 className="text-lg flex">{taskName}</h3>
        <button
          className="flex items-center text-blue-500"
          onClick={() => setIsEditing(true)}
        >
          <FaEdit className="mr-2" />
        </button>
      </div>
    );
  }

  return (
    <>
      {taskContent}
      <Form className="flex" onSubmit={handleDelete}>
        <button className="flex items-center text-red-500">
          <FaTrash className="" />
        </button>
      </Form>
    </>
  );
};
