import { useState, useEffect } from "react";
export default function Header() {
  const [time, setTime] = useState(0);
  const [date, setDate] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setDate(new Date().toLocaleDateString());
    }, 1000);
  }, []);

  return (
    <div className="bg-gray-700 text-white text-center rounded-2xl">
      <h1 className="p-2.5 text-2xl font-bold text-emerald-600">
        Keep Checking the time because{" "}
        <span className="text-3xl text-red-800"> Time is crucial </span>
      </h1>
      <h1 className="pb-2.5 text-2xl font-bold text-emerald-600">
        {date} | {time}
      </h1>
    </div>
  );
}
