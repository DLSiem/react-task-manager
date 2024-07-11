import { useState } from "react";
import propTypes from "prop-types";
import { useFetcher } from "react-router-dom";

const CustomCheckbox = ({ check, taskId }) => {
  const fetcher = useFetcher();
  const [checked, setChecked] = useState(check);
  return (
    <label className="flex items-center cursor-pointer mr-2">
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={() => {
          fetcher.submit(
            {
              type: "update-task",
              taskId: taskId,
              taskStatus: checked ? "Pending" : "Completed",
            },
            {
              method: "PATCH",
            }
          );
          setChecked(!checked);
        }}
      />
      <div
        className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center ${
          checked ? "bg-blue-500 border-blue-500" : "bg-white"
        }`}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
    </label>
  );
};

export default CustomCheckbox;

CustomCheckbox.propTypes = {
  check: propTypes.bool,
  taskId: propTypes.number,
};
