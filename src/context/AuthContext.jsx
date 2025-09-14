import React, { createContext, use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
// export const verifyContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  const navigate = useNavigate();

  const verify = async () => {
    try {
      const response = await fetch(
        "https://api.durlavparajuli.com.np/api/auth/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const res = await response.json();
        setUser(res.userData);
        setIsLoggedIn(true);
      } else {
        logout();
      }
    } catch (error) {
      console.log(error);
      logout();
    }
  };

  useEffect(() => {
    if (token) {
      verify();
    }
  }, [token]);

  console.log(isLoggedIn);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <AuthContext.Provider
        value={{ token, setToken, logout, isLoggedIn, user }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
