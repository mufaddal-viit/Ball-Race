import { createContext, useContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const Login = (incoming_user) => {
    localStorage.setItem("user", incoming_user);
    setUser(incoming_user);
  };

  const Logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use context
export const useAuth = () => {
  return useContext(AuthContext);
};
