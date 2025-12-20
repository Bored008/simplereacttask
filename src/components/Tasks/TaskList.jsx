import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Trash2, Clock, Calendar, Zap, Inbox, Trash } from "lucide-react";
import DataService from "../../Localstorage";

function TaskCard({ task, onComplete, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      {/* Background Glow on Hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>

      <div className="relative glass rounded-3xl p-6 border-white/5 flex flex-col h-full overflow-hidden">
        {/* Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${task.completed ? 'bg-emerald-500' : 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)] animate-pulse'}`}></div>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              {task.completed ? 'Completed' : 'In Progress'}
            </span>
          </div>

          <button
            onClick={() => onDelete(task.id)}
            className="p-2 bg-rose-500/10 text-rose-500 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-rose-500 hover:text-white transition-all transform hover:scale-110"
            title="Delete Task"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Content Section */}
        <div className="space-y-4 flex-grow">
          <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors break-words">
            {task.taskTitle}
          </h4>

          <div className="relative">
            <p className={`text-gray-400 text-sm leading-relaxed whitespace-pre-wrap transition-all duration-300 ${isExpanded ? "" : "line-clamp-3"}`}>
              {task.taskDescription}
            </p>
            {task.taskDescription.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest"
              >
                {isExpanded ? "Show Less" : "Read More"}
              </button>
            )}
          </div>
        </div>

        {/* Footer Section */}
        <div className="pt-4 mt-6 border-t border-white/5 space-y-3">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-gray-500 font-bold uppercase tracking-widest">
              <Calendar size={12} />
              <span>Created</span>
            </div>
            <span className="text-indigo-400 font-medium">{task.createdAt}</span>
          </div>

          {task.completed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between text-[11px]"
            >
              <div className="flex items-center gap-1.5 text-emerald-500 font-bold uppercase tracking-widest">
                <CheckCircle2 size={12} />
                <span>Completed</span>
              </div>
              <span className="text-emerald-400 font-medium">{task.completedAt}</span>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onComplete(task.id)}
              className="w-full mt-2 py-3 bg-white text-black font-bold text-xs rounded-xl hover:bg-indigo-500 hover:text-white transition-colors flex items-center justify-center gap-2 group/btn"
            >
              <CheckCircle2 size={14} className="group-hover/btn:scale-110 transition-transform" />
              Mark as Done
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function TaskList({ mainTask, setMainTask }) {
  const [showCompleted, setShowCompleted] = useState(false);

  const completeHandler = (id) => {
    setMainTask((prev) => {
      const updated = prev.map((t) =>
        t.id === id ? { ...t, completed: true, completedAt: new Date().toLocaleString() } : t
      );
      DataService.saveTasks(updated);
      return updated;
    });
  };

  const deleteHandler = (id) => {
    setMainTask((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      DataService.saveTasks(updated);
      return updated;
    });
  };

  const clearAll = () => {
    setMainTask((prev) => {
      const updated = prev.filter((t) => (showCompleted ? !t.completed : t.completed));
      DataService.saveTasks(updated);
      return updated;
    });
  };

  const filteredTasks = mainTask.filter((t) => (showCompleted ? t.completed : !t.completed));

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex p-1.5 bg-slate-900/60 rounded-2xl border border-white/5 ring-1 ring-white/5">
          <button
            onClick={() => setShowCompleted(false)}
            className={`px-8 py-3 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${!showCompleted
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "text-gray-500 hover:text-gray-300"
              }`}
          >
            Active Tasks
          </button>
          <button
            onClick={() => setShowCompleted(true)}
            className={`px-8 py-3 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${showCompleted
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "text-gray-500 hover:text-gray-300"
              }`}
          >
            Completed
          </button>
        </div>

        {filteredTasks.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearAll}
            className="group flex items-center gap-3 px-6 py-3 bg-rose-500/5 hover:bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
          >
            <Trash size={14} />
            Clear {showCompleted ? "History" : "Active"}
          </motion.button>
        )}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredTasks.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="col-span-full py-24 glass rounded-[2.5rem] border-dashed border-2 border-white/5 flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative p-6 bg-slate-900/80 rounded-full border border-white/10 text-indigo-400">
                  {showCompleted ? <Inbox size={48} /> : <Zap size={48} />}
                </div>
              </div>
              <div className="space-y-2 px-6">
                <h3 className="text-2xl font-black text-white tracking-tight">
                  {showCompleted ? "Archive is Empty" : "All Caught Up!"}
                </h3>
                <p className="text-gray-500 font-medium max-w-xs mx-auto">
                  {showCompleted
                    ? "Complete some tasks to see them in your archive."
                    : "No pending tasks at the moment. Great job!"}
                </p>
              </div>
            </motion.div>
          ) : (
            filteredTasks.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onDelete={deleteHandler}
                onComplete={completeHandler}
              />
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
