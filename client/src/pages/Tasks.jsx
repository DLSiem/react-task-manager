import { useState } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { FaEdit, FaPlus, FaTrash, FaSave } from "react-icons/fa";
import propTypes from "prop-types";

const Tasks = ({ tasks }) => {
  const [taskName, setTaskName] = useState("");
  const fetcher = useFetcher();
  const params = useParams();

  const projectId = parseInt(params.projectId);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task Name:", taskName);
    fetcher.submit(
      {
        type: "create-task",
        taskName: taskName,
        projectId: projectId,
      },
      {
        method: "post",
      }
    );
    setTaskName("");
  };

  return (
    <>
      <section className="mt-4">
        <form method="post" className="flex space-x-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded"
            placeholder="Enter task name"
          />
          <button
            type="submit"
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 `}
          >
            <FaPlus className="m-1" />
          </button>
        </form>
      </section>
      <hr className="my-4" />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
        {tasks.length === 0 && (
          <p className="text-lg text-gray-500">No tasks found</p>
        )}

        <ul className="space-y-2">
          {tasks.map(({ TaskName, TaskId }, index) => (
            <li
              key={index}
              className="p-2 bg-gray-100 rounded flex justify-between"
            >
              <Task taskName={TaskName} taskId={TaskId} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

Tasks.propTypes = {
  tasks: propTypes.arrayOf(
    propTypes.shape({
      TaskId: propTypes.number,
      ProjectId: propTypes.number,
      TaskName: propTypes.string,
      Status: propTypes.string,
    })
  ),
};

export default Tasks;

const Task = ({ taskName, taskId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(taskName);
  const fetcher = useFetcher();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetcher.submit(
      {
        type: "update-task",
        taskId: taskId,
        taskName: name,
      },
      {
        method: "PATCH",
      }
    );
    setIsEditing(false);
  };

  let taskContent;

  if (isEditing) {
    taskContent = (
      <form className="w-full flex" onSubmit={handleSubmit}>
        <input
          type="text"
          defaultValue={name}
          name={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-grow text-lg  border border-gray-300 rounded mr-2"
        />
        <button className="flex items-center text-blue-500">
          <FaSave className="mr-2" />
        </button>
      </form>
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

      <button
        className="flex items-center text-red-500"
        onClick={() => {
          fetcher.submit(
            {
              type: "delete-task",
              taskId: taskId,
            },
            {
              method: "DELETE",
            }
          );
        }}
      >
        <FaTrash className="" />
      </button>
    </>
  );
};

Task.propTypes = {
  taskName: propTypes.string,
  taskId: propTypes.number,
};
