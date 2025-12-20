import { motion } from "framer-motion";
import { Github, Linkedin, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-8 border-t border-white/5 pt-6 pb-8 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center border border-white/10">
            <span className="text-white font-black text-sm">N</span>
          </div>
          <span className="text-white font-black tracking-tight text-xl">NovaTask</span>
        </div>

        <div className="flex gap-4 relative z-10">
          {[
            { id: 'linkedin', icon: <Linkedin size={20} />, link: 'https://www.linkedin.com/in/himanshuakabored/', color: 'hover:text-blue-400 hover:bg-blue-400/10' },
            { id: 'github', icon: <Github size={20} />, link: 'https://github.com/Bored008', color: 'hover:text-white hover:bg-white/10' },
            { id: 'telegram', icon: <Send size={20} />, link: 'https://t.me/BoRed_Xagain', color: 'hover:text-sky-400 hover:bg-sky-400/10' }
          ].map((social) => (
            <motion.a
              key={social.id}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-11 h-11 flex items-center justify-center bg-slate-900/50 text-gray-500 rounded-xl border border-white/5 transition-all duration-300 ${social.color}`}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}

