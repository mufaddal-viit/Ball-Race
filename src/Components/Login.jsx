import { useState } from "react";
import { useAuth } from "./auth";

function Login() {
  const [username, setusername] = useState("");
  const { user, Login, Logout } = useAuth();

  const handleLogin = () => {
    if (username.trim()) {
      Login(username.trim());
      setusername("");
    }
  };

  return (
    <>
      {!user && (
        <div className="flex justify-center items-center min-h-screen px-4">
          <div className="flex flex-col w-full max-w-sm bg-white border rounded-2xl shadow-md space-y-5 p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              Login Here
            </h2>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-center text-sm md:text-base"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition-all duration-300 text-sm md:text-base"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
