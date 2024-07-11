import { useState } from "react";
import {} from "react-router-dom";
import { FaEdit, FaPlus, FaTrash, FaSave } from "react-icons/fa";
import propTypes from "prop-types";

const Tasks = ({ tasks }) => {
  return (
    <>
      <section className="mt-4">
        <form
          method="post"
          className="flex space-x-4"
          //   onSubmit={handleCreateTask}
        >
          <input
            type="text"
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

const Task = ({ taskName }) => {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;

  if (isEditing) {
    taskContent = (
      <form className="w-full flex">
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
      <form className="flex">
        <button className="flex items-center text-red-500">
          <FaTrash className="" />
        </button>
      </form>
    </>
  );
};
