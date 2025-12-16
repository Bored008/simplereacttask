import { useState } from "react";

export default function TaskList({ mainTask, setMainTask }) {
  const [showCompleted, setShowCompleted] = useState(false);

  const completeHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask[i].completed = true;
    copyTask[i].completedAt = new Date().toLocaleString();
    setMainTask(copyTask);
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const clearAll = () => {
    if (showCompleted) {
      // Clear all completed tasks, keep active ones
      setMainTask(mainTask.filter((t) => !t.completed));
    } else {
      // Clear all active tasks, keep completed ones
      setMainTask(mainTask.filter((t) => t.completed));
    }
  };

  let renderedTasks = (
    <h2 className="text-xl m-2 bg-emerald-600 rounded-xl p-2 text-white text-l font-semibold">
      {showCompleted ? "No completed tasks" : "No active tasks available"}
    </h2>
  );

  if (mainTask.length > 0) {
    const filteredTasks = mainTask
      .map((t, i) => ({ ...t, originalIndex: i }))
      .filter((t) => (showCompleted ? t.completed : !t.completed));

    if (filteredTasks.length > 0) {
      renderedTasks = filteredTasks.map((t) => {
        return (
          <li key={t.originalIndex} className="flex-wrap wrap-break-word mb-3">
            <div className="relative m-2 mb-1 bg-emerald-600 rounded-xl p-2 pb-6 text-white text-l font-semibold">
              <h5>
                <span className="font-bold text-xl">Title : </span>
                {t.taskTitle}
              </h5>
              <h5>
                <span className="font-bold text-xl ">Description : </span>
                {t.taskDescription}
              </h5>
              <h5>
                <span className="absolute bottom-0 right-0 p-1 pr-2 text-sm">
                  {t.createdAt}
                </span>
              </h5>
              {t.completed && (
                <h5>
                  <span className="font-bold text-xl text-emerald-200">Completed on : </span>
                  {t.completedAt}
                </h5>
              )}
            </div>
            <button
              onClick={() => {
                deleteHandler(t.originalIndex);
              }}
              className="m-2 bg-red-500 rounded-xl p-2 text-white text-l font-semibold"
            >
              Delete
            </button>
            {!t.completed && (
              <button
                onClick={() => {
                  completeHandler(t.originalIndex);
                }}
                className="m-2 bg-green-500 rounded-xl p-2 text-white text-l font-semibold"
              >
                Completed
              </button>
            )}
          </li>
        );
      });
    }
  }

  return (
    <div className=" my-3 bg-gray-700 rounded-2xl p-4">
      <div className="relative ml-3 flex gap-4">
        <button
          onClick={() => setShowCompleted(false)}
          className={`text-2xl text-white font-bold mb-2 rounded-2xl p-2 px-3 ${
            !showCompleted ? "bg-emerald-800 border-2 border-white" : "bg-emerald-600"
          }`}
        >
          Task List
        </button>
        <button
          onClick={() => setShowCompleted(true)}
          className={`text-2xl text-white font-bold mb-2 rounded-2xl p-2 px-3 mr-90 ${
            showCompleted ? "bg-emerald-800 border-2 border-white" : "bg-emerald-600"
          }`}
        >
          Completed Task
        </button>
        <button
          onClick={() => {
            clearAll();
          }}
          className="absolute right-0 text-xl text-white font-bold mb-2 mr-3 bg-red-500 rounded-2xl p-2 px-3"
        >
          Clear All
        </button>
      </div>
      <div>
        <ul>{renderedTasks}</ul>
      </div>
    </div>
  );
}
