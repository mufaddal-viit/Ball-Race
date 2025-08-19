import { useState } from "react";
import { useAuth } from "./auth";

function Login() {
  const [username, setusername] = useState("");
  const { user, Login, Logout } = useAuth();
  //   console.log(user);

  const handleLogin = () => {
    if (username.trim()) {
      Login(username.trim());
      setusername("");
    }
  };

  const handleLogout = () => {
    Logout();
  };

  return (
    <>
      {user ? (
        <div className="p-2">
          {/* <p>
            ✅ Logged in as: <strong>{String(user).toLocaleUpperCase()}</strong>
          </p>
          <button
            onClick={handleLogout}
            className=" mt-2 bg-gray-500 text-center px-4 py-2 text-2xl font-bold rounded hover:bg-rose-300 border-2 border-rose-600"
          >
            Logout
          </button> */}
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col rounded-2xl space-y-5 border-2 p-3  w-xl m-auto">
          <h2 className="font-bold text-3xl group">Login Here</h2>
          <input
            type="text"
            placeholder="Enter your username"
            className=" px-2 py-1 border rounded-2xl text-center"
            onChange={(e) => setusername(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="border text-center px-2 py-0.5 text-2xl font-bold rounded hover:bg-purple-300 transition-all duration-300 "
          >
            {" "}
            Login{" "}
          </button>
        </div>
      )}
    </>
  );
}

export default Login;
