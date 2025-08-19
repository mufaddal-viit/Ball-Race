import Login from "./Components/Login";
import { useAuth } from "./Components/auth";
import { useTheme } from "./Components/Context";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

function Header() {
  const { user, Logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    Logout();
  };

  // Dynamic classes based on theme
  const isLight = theme === "light";

  const headerBg = isLight
    ? "from-blue-100 to-indigo-200"
    : "from-gray-800 to-gray-900";

  const titleColor = isLight ? "text-blue-800" : "text-indigo-200";
  const subTitleColor = isLight ? "text-indigo-800" : "text-indigo-200";
  const raceColor = isLight ? "text-indigo-600" : "text-yellow-300";
  const textColor = isLight ? "text-blue-900" : "text-gray-100";
  const hoverBg = isLight ? "hover:bg-purple-300" : "hover:bg-purple-700";
  const iconColor = isLight ? "text-gray-700" : "text-yellow-300";

  return (
    <header
      className={`bg-gradient-to-r ${headerBg} shadow-md rounded-3xl my-4 mx-4 px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-500`}
    >
      {/* Game Title */}
      <div className="text-center sm:text-left">
        <h1
          className={`text-xl sm:text-2xl md:text-3xl font-extrabold ${titleColor} tracking-wide flex items-center justify-center sm:justify-start gap-2`}
        >
          🏀 Ball
          <span className={raceColor}>Race</span>
          <span className="inline-block animate-bounce mx-1">🏀</span>
        </h1>
        <p
          className={`text-sm sm:text-base md:text-lg font-bold ${subTitleColor}`}
        >
          - Click me to get Points
        </p>
      </div>

      {/* User Info + Logout */}
      {user && (
        <div className={`text-center sm:text-right ${textColor}`}>
          <p className="text-sm sm:text-base">
            ✅ Logged in as:{" "}
            <strong className="uppercase">{String(user)}</strong>
          </p>
          <button
            onClick={handleLogout}
            className={`mt-1 border border-gray-500 text-center px-4 py-1 text-sm sm:text-base font-semibold rounded ${hoverBg} transition-all duration-300`}
          >
            Logout
          </button>
        </div>
      )}

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`text-2xl sm:text-3xl ${iconColor} hover:scale-110 transition-transform`}
        title="Toggle Theme"
      >
        {theme === "dark" ? <MdOutlineLightMode /> : <MdDarkMode />}
      </button>
    </header>
  );
}

export default Header;
