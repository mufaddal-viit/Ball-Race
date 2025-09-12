import { useState } from "react";
import { useAuth } from "./auth";

function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { user, Login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent page reload

    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setError("Username is required");
      return;
    }

    Login(trimmedUsername);
    setUsername("");
    setError("");
  };

  return (
    <>
      {!user && (
        <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50">
          <form
            onSubmit={handleLogin}
            className="flex flex-col w-full max-w-sm bg-white border rounded-2xl shadow-md space-y-5 p-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-700">
              Login Here
            </h2>

            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-center text-sm md:text-base"
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition-all duration-300 text-sm md:text-base"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
