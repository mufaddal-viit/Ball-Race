import { useEffect, useState } from "react";
import BallGame from "./Components/BallGame";
import { AuthProvider, useAuth } from "./Components/auth";
import Login from "./Components/Login";

import { ThemeProvider, useTheme } from "./Components/Context";
import Header from "./Header";

function AppContent() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "light"
          ? "bg-gradient-to-t from-blue-200 via-indigo-300 to-purple-400"
          : "bg-gray-700"
      } px-2 py-0.5`}
    >
      <Header />
      <Login />
      {user && <BallGame />}
    </div>
  );
}
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;
