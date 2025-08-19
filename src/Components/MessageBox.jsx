import { useTheme } from "./Context"; // adjust path if needed

export default function MessageBox({ score }) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div
      className={`border px-4 py-2 rounded shadow mb-2 transition-all duration-300 ${
        isLight
          ? "bg-white text-gray-800"
          : "bg-gray-800 text-yellow-300 border-gray-600"
      }`}
    >
      {score}
    </div>
  );
}
