import { useTheme } from "./Context"; // Adjust path if needed

export default function Ball({ xpos, ypos, onClick }) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div
      onClick={onClick}
      className={`w-[30px] h-[30px] rounded-full absolute cursor-pointer transition-all duration-300 ease-in-out ${
        isLight ? "bg-red-500" : "bg-yellow-300"
      }`}
      style={{ top: ypos, left: xpos }}
    />
  );
}
