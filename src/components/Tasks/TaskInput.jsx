import { setLocalStorageData } from "../../Localstorage";
import locked from "./locked.gif";
import { useState } from "react";
import { getLocalStorageData } from "../../Localstorage";
import TaskList from "./TaskList";

export default function TaskInput() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [mainTask, setMainTask] = useState(() => getLocalStorageData());

  setLocalStorageData(mainTask);

  const submitHandler = (e) => {
    e.preventDefault();
    if(!taskTitle.trim() || !taskDescription.trim()){
       return alert("Title or description incomplete");
    }
    setMainTask([...mainTask, { taskTitle, taskDescription, createdAt:new Date().toLocaleString(), completed:false }]);

    setTaskTitle("");
    setTaskDescription("");

    console.log(mainTask);
  };

  return (
    <>
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
                <button className="mt-6 text-white bg-green-500 w-full p-3 font-bold text-xl rounded-lg">
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
      <TaskList mainTask={mainTask} setMainTask={setMainTask} />
    </>
  );
}
