import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Sparkles, Activity, Shield, Info } from "lucide-react";
import DataService from "../../Localstorage";
import TaskList from "./TaskList";
import lockedGif from "./locked.gif";

export default function TaskInput() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [mainTask, setMainTask] = useState([]);

  useEffect(() => {
    DataService.getTasks().then(setMainTask);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!taskTitle.trim() || !taskDescription.trim()) return;

    const newTask = {
      id: DataService.generateId(),
      taskTitle: taskTitle.trim(),
      taskDescription: taskDescription.trim(),
      createdAt: new Date().toLocaleString(),
      completed: false,
    };

    setMainTask((prev) => {
      const updated = [...prev, newTask];
      DataService.saveTasks(updated);
      return updated;
    });

    setTaskTitle("");
    setTaskDescription("");
  };

  const activeCount = mainTask.filter(t => !t.completed).length;
  const totalCount = mainTask.length;
  const progress = totalCount > 0 ? ((totalCount - activeCount) / totalCount) * 100 : 0;

  return (
    <div className="space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-25 transition duration-1000"></div>

        <div className="relative glass rounded-[2.5rem] overflow-hidden shadow-2xl border-white/5">
          <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-white/5">
            {/* Form Section */}
            <div className="p-8 lg:p-14 lg:w-[60%] space-y-10">
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest"
                >
                  <Sparkles size={12} className="animate-pulse" />
                  New Task
                </motion.div>
                <h2 className="text-4xl font-black text-white tracking-tight leading-tight">
                  Add <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">New Task</span>
                </h2>
                <p className="text-gray-400 font-medium">Capture your ideas and turn them into action items.</p>
              </div>

              <form onSubmit={submitHandler} className="space-y-8">
                <div className="space-y-3 group/input">
                  <label className="text-[11px] font-black text-gray-500 ml-1 uppercase tracking-[0.2em] group-focus-within/input:text-indigo-400 transition-colors">Task Title</label>
                  <input
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-5 px-8 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:bg-slate-900/80 transition-all font-medium text-lg shadow-inner"
                    type="text"
                    placeholder="What needs to be done?"
                  />
                </div>

                <div className="space-y-3 group/input">
                  <label className="text-[11px] font-black text-gray-500 ml-1 uppercase tracking-[0.2em] group-focus-within/input:text-indigo-400 transition-colors">Description</label>
                  <textarea
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-5 px-8 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:bg-slate-900/80 transition-all font-medium min-h-[160px] shadow-inner resize-none"
                    placeholder="Add some details..."
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="relative w-full group/btn"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-40 group-hover/btn:opacity-80 transition duration-300"></div>
                  <div className="relative h-16 bg-indigo-600 rounded-2xl flex items-center justify-center gap-3 text-white font-black text-lg shadow-xl shadow-indigo-900/20 transition-all">
                    <span>Add Task</span>
                    <Plus size={20} className="group-hover/btn:rotate-90 transition-transform duration-300" />
                  </div>
                </motion.button>
              </form>
            </div>

            {/* Info Section (with locked.gif) */}
            <div className="lg:w-[40%] bg-slate-900/40 relative flex flex-col p-10 lg:p-14 overflow-hidden">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px]"></div>

              <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                {/* GIF Header */}
                <div className="flex flex-col items-center justify-center text-center space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl animate-pulse"></div>
                    <img
                      src={lockedGif}
                      alt="Security Locked"
                      className="w-32 h-32 object-contain relative z-10 drop-shadow-[0_0_25px_rgba(99,102,241,0.4)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest">
                      <Shield size={14} />
                      <span>Local Storage</span>
                    </div>
                    <p className="text-gray-500 text-sm font-medium">All tasks are saved on your device</p>
                  </div>
                </div>

                {/* Progress Card */}
                <div className="glass-plus p-8 rounded-3xl border-white/10 space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="flex items-center gap-2 text-white font-black text-xl">
                        <Activity size={20} className="text-indigo-400" />
                        Progress
                      </div>
                      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                        {activeCount} Tasks Remaining
                      </p>
                    </div>
                    <span className="text-3xl font-black text-indigo-400 tracking-tighter">
                      {Math.round(progress)}%
                    </span>
                  </div>

                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"
                    ></motion.div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group/stat">
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total</p>
                      <p className="text-2xl font-black text-white mt-1 group-hover:text-indigo-400 transition-colors">{totalCount}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group/stat">
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active</p>
                      <p className="text-2xl font-black text-indigo-400 mt-1">{activeCount}</p>
                    </div>
                  </div>
                </div>

                {/* Tip Section */}
                <div className="flex items-center gap-4 bg-indigo-500/5 p-4 rounded-2xl border border-indigo-500/10">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400">
                    <Info size={16} />
                  </div>
                  <p className="text-xs text-indigo-100/60 font-medium leading-relaxed">
                    Tip: Break down big tasks into smaller, manageable steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <TaskList mainTask={mainTask} setMainTask={setMainTask} />
    </div>
  );
}

