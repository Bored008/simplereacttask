import React, { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "../../contexts/UserContext";
import { Sparkles, Terminal } from "lucide-react";

export default function Welcome() {
    const [nameInput, setNameInput] = useState("");
    const { saveUsername } = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nameInput.trim()) {
            saveUsername(nameInput.trim());
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4 overflow-hidden relative">
            {/* Background Decorative Blurs */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md p-8 sm:p-12 glass rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10"
            >
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ rotate: -10, scale: 0.8 }}
                        animate={{ rotate: 3, scale: 1 }}
                        whileHover={{ rotate: 0, scale: 1.05 }}
                        className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/30 mx-auto mb-8 cursor-default"
                    >
                        <span className="text-white font-black text-4xl">N</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-4xl font-black text-white mb-3 tracking-tight">
                            Nova<span className="text-indigo-400">Task</span>
                        </h2>
                        <p className="text-gray-400 font-medium">
                            Welcome to your workspace
                        </p>
                    </motion.div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 ml-1 uppercase tracking-[0.2em]">Your Name</label>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="group relative"
                        >
                            <input
                                type="text"
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                                placeholder="Enter your name..."
                                className="w-full bg-slate-900/50 border border-white/10 text-white rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-transparent transition-all placeholder:text-gray-600 text-lg font-medium shadow-inner"
                                autoFocus
                                required
                            />
                        </motion.div>
                    </div>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-900/40 transition-all flex items-center justify-center gap-3 text-lg"
                    >
                        <Terminal size={20} />
                        Launch Dashboard
                    </motion.button>
                </form>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 1 }}
                    className="mt-12 pt-8 border-t border-white/5 text-center"
                >
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-2">
                        <Sparkles size={10} className="text-indigo-500" />
                        Private & Local Store
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}

