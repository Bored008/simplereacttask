import Footer from "./components/layout/Footer.jsx";
import Header from "./components/layout/Header.jsx";
import TaskInput from "./components/Tasks/TaskInput.jsx";
import Welcome from "./components/auth/Welcome.jsx";
import { useUser } from "./contexts/UserContext.jsx";

export default function App() {
  const { username, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!username) {
    return <Welcome />;
  }

  return (
    <div className="min-h-screen pb-6 sm:pb-12 font-['Inter']">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        <section className="w-full">
          <TaskInput />
        </section>
        <section className="w-full">
          <footer className="glass rounded-2xl overflow-hidden mt-6 sm:mt-12">
            <Footer />
          </footer>
        </section>
      </main>
    </div>
  );
}

