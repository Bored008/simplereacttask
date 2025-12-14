import { setLocalStorageData } from "../../Localstorage";
import locked from "./locked.gif";
import { useState } from "react";
import { getLocalStorageData } from "../../Localstorage";

export default function TaskInput() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [mainTask, setMainTask] = useState(() => getLocalStorageData());

  setLocalStorageData(mainTask);

  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { taskTitle, taskDescription }]);

    setTaskTitle("");
    setTaskDescription("");

    console.log(mainTask);
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  let newTask = (
    <h2 className="text-xl m-2 bg-emerald-600 rounded-xl p-2 text-white text-l font-semibold">
      no task available
    </h2>
  );

  if (mainTask.length > 0) {
    newTask = mainTask.map((t, i) => {
      return (
        <li key={i} className="flex-wrap wrap-break-word mb-3">
          <div className="m-2 mb-1 bg-emerald-600 rounded-xl p-2 text-white text-l font-semibold">
            <h5>
              <span className="font-bold text-xl">Title : </span>
              {t.taskTitle}
            </h5>
            <h5>
              <span className="font-bold text-xl ">Description : </span>
              {t.taskDescription}
            </h5>
          </div>
          <button
            onClick={() => {
              deleteHandler(i);
            }}
            className="m-2 bg-red-500 rounded-xl p-2 text-white text-l font-semibold"
          >
            Delete
          </button>
        </li>
      );
    });
  }

  return (
    <div className="">
      <div className="flex gap-5">
        <div className=" my-3 bg-gray-700 rounded-2xl w-full md:w-3/5">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className="p-5"
          >
            <div className="flex">
              <i className="ri-arrow-left-circle-line font-thin text-4xl opacity-80"></i>
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
                <h3 className="w-full opacity-80 text-3xl text-emerald-600 font-bold">
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
        <div className="m-12 hidden md:block">
          <img src={locked} alt="locked"></img>
        </div>
      </div>
      <div className=" my-3 bg-gray-700 rounded-2xl p-4">
        <h1 className="text-2xl text-white font-bold mb-4">Your Task List -</h1>
        <ul>{newTask}</ul>
      </div>
    </div>
  );
}
