import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, User, ShieldCheck } from "lucide-react";

export default function Header() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState(new Date().toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 glass mb-8 border-b border-white/5 px-4 sm:px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto py-4">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-3 sm:gap-5">
            <motion.div
              whileHover={{ rotate: 5 }}
              className="relative group"
            >
              <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/10 ring-1 ring-white/5">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-indigo-400 font-black text-xl sm:text-2xl">N</span>
              </div>
            </motion.div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                NovaTask
                <span className="hidden xs:inline-flex items-center px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-widest">v2.0</span>
              </h1>
              <p className="text-[10px] text-gray-500 font-medium uppercase tracking-[0.2em] hidden sm:block">Simple & Powerful Tasks</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-8">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5 sm:gap-2 text-white font-bold text-[12px] sm:text-lg tabular-nums tracking-wider uppercase">
                <Clock size={14} className="text-indigo-400 sm:w-[18px] sm:h-[18px]" />
                {time}
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider mt-0.5">
                <Calendar size={12} className="sm:w-[14px] sm:h-[14px]" />
                {date}
              </div>
            </div>

            <div className="h-8 w-px bg-white/10 block"></div>

            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-xs font-bold text-white uppercase tracking-tight">{getGreeting()}, User</span>
                <span className="flex items-center gap-1 text-[9px] text-emerald-500 font-bold uppercase">
                  <ShieldCheck size={10} />
                  Active
                </span>
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-indigo-500/20 p-0.5 cursor-pointer bg-slate-800 flex items-center justify-center overflow-hidden"
              >
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

