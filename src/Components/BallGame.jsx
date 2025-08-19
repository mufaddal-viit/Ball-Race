import { useState, useEffect, useRef } from "react";
import MessageBox from "./MessageBox";
import Ball from "./Ball";
import { useAuth } from "./auth";
import { useTheme } from "./Context";

export default function BallGame() {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const boxRef = useRef(null);
  const { user } = useAuth();
  const [difficult, setDifficult] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  let [scoreList, setScorelist] = useState([]);

  const handledifficult = () => {
    setDifficult((prev) => !prev);
    handlereset();
  };

  useEffect(() => {
    const moveBall = () => {
      if (!boxRef.current) return;

      const boxWidth = boxRef.current.clientWidth;
      const boxHeight = boxRef.current.clientHeight;

      const x = Math.floor(Math.random() * (boxWidth - 30));
      const y = Math.floor(Math.random() * (boxHeight - 30));

      setPosition({ x, y });
      setClicked(false);
      setTotal((prev) => prev + 1);
    };

    moveBall(); // initial position
    const intervalId = setInterval(moveBall, difficult ? 700 : 1000);
    return () => clearInterval(intervalId);
  }, [difficult]);

  const handleBallClick = () => {
    if (!clicked) {
      setCount((prev) => prev + 1);
      setClicked(true);
    }
  };
  const handlereset = () => {
    const marks = `${count}/${total}`;
    setScorelist((prev) => [...prev, marks]);
    setCount(0);
    setTotal(0);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-8 ">
      <h2
        className={`text-3xl font-bold ${
          isLight ? "text-blue-800" : "text-white"
        }`}
      >
        🎮 Welcome, {String(user).toUpperCase()}!
      </h2>

      <div className="flex flex-col md:flex-row w-full max-w-5xl gap-15 ">
        {/* Left Panel: Results */}
        <div className="flex flex-col  w-full md:w-1/2  pt-2 px-6 border rounded-lg shadow-md">
          <p
            className={`font-bold text-lg ${
              isLight ? "text-gray-800" : "text-gray-200"
            }`}
          >
            All Scores
          </p>
          <div className="flex flex-col gap-4 mt-4">
            <ul className=" rounded-lg overflow-y-auto max-h-70 pr-4">
              {scoreList.map((s, i) => (
                <li
                  className={`px-4 py-3 transition mb-1 rounded ${
                    isLight
                      ? "bg-white hover:bg-gray-50 text-gray-800"
                      : "bg-gray-800 hover:bg-gray-700 text-gray-100"
                  }`}
                >
                  <p className="text-gray-700">
                    <span className="font-medium text-blue-700">
                      Round {i + 1}:
                    </span>{" "}
                    <span
                      className={`font-semibold ${
                        isLight ? "text-gray-900" : "text-yellow-300"
                      }`}
                    >
                      {s}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Panel: Game Box */}
        <div className="w-full md:w-1/2 flex flex-col items-center border rounded-lg shadow-md">
          <div className="flex gap-4 p-2.5 ">
            <button
              onClick={handlereset}
              className={`flex-1 px-2 font-bold border rounded transition 
    ${
      isLight
        ? "text-white hover:bg-purple-400"
        : "text-yellow-300 hover:bg-purple-700"
    }`}
            >
              🔄 Restart
            </button>

            <button
              onClick={handledifficult}
              className={`flex-1 px-2 font-bold border rounded transition 
    ${
      isLight
        ? "text-white hover:bg-purple-400"
        : "text-yellow-300 hover:bg-purple-700"
    }`}
            >
              {difficult ? "⬇️ Normal Mode" : "⬆️ Difficult Mode"}
            </button>
          </div>
          <div
            ref={boxRef}
            className={`relative ${
              difficult ? "w-96 h-80" : "w-80 h-56"
            } border-4 border-blue-400 rounded-lg bg-blue-50 overflow-hidden shadow-lg mb-3`}
          >
            <Ball
              xpos={position.x}
              ypos={position.y}
              onClick={handleBallClick}
            />
          </div>
          <MessageBox score={`🎯 Score: ${count} / ${total}`} total={total} />
        </div>
      </div>
    </div>
  );
}
