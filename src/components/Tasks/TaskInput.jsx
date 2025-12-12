import { useState } from "react";
export default function TaskInput() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    setNewTask({
      taskTitle,
      taskDescription,
    });

    setTaskTitle("");
    setTaskDate("");
    setTaskDescription("");
  };
  return (
    <div className=" rounded-md mt-3">
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="p-5"
      >
        <div className="flex">
          <i class="ri-arrow-left-circle-line font-thin text-4xl opacity-80"></i>
          <h1 className="font-semibold ml-2 text-5xl text-emerald-600">
            Create Task
          </h1>
        </div>
        <div className="mt-5">
          <div className="m-4 flex">
            <h3 className="opacity-80 text-3xl text-emerald-600 font-bold">
              Task title
            </h3>
            <input
              value={taskTitle}
              onChange={(e) => {
                setTaskTitle(e.target.value);
              }}
              className="w-full font-semibold rounded-md py-1 px-3 items-center mt-2 bg-white"
              type="text"
              placeholder="Make a UI design"
            />
          </div>
          <div className="mt-4 m-4">
            <h3 className="opacity-80 text-3xl text-emerald-600 font-bold">
              Description
            </h3>
            <textarea
              value={taskDescription}
              onChange={(e) => {
                setTaskDescription(e.target.value);
              }}
              className="w-full font-semibold rounded-md py-1 px-3 mt-2 bg-white"
              cols="30"
              rows="10"
              name=""
              id=""
              placeholder="Detailed description of task (Max 500 word)"
            ></textarea>
            <button className="mt-6 text-white bg-green-400 w-full p-3 font-bold text-xl rounded-lg">
              Create Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
