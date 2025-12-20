import { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";

export default function Header() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const { username, resetUser } = useUser();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setDate(new Date().toLocaleDateString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 glass mb-6 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
              <span className="text-white font-bold text-xl">
                {username?.charAt(0).toUpperCase() || "N"}
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 leading-tight">
                  {username}
                </h1>
                <button
                  onClick={resetUser}
                  className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                  title="Change Username"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">Personal Workspace</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            <div className="px-3 sm:px-4 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20">
              <span className="text-indigo-400 font-bold text-[11px] sm:text-sm whitespace-nowrap tracking-tight">
                {date} • <span className="text-white">{time}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400 font-medium hidden lg:inline">System Active</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
