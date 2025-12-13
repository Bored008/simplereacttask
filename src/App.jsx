import Footer from "./components/layout/Footer.jsx";
import Header from "./components/layout/Header.jsx";
import TaskInput from "./components/Tasks/TaskInput.jsx";

export default function App() {
  return (
    <div className="m-9 flex flex-wrap">
      <div className="w-full">
        <Header />
      </div>
      <div className="w-full">
        <TaskInput />
      </div>
      <div className="bg-gray-700 rounded-2xl w-full">
        <Footer />
      </div>
    </div>
  );
}
