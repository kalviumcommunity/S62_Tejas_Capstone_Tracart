import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //   const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const validateToken = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/validate`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setUser(response.data);
    } catch (err) {
      console.error("Token validation failed", err);
      setUser(null);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    let token = null;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password }
      );
      console.log(response.data);
      if (response.data.token) {
        setUser(response.data.data);
        console.log(response.data);
        token = response.data.token;
      }
    } catch (err) {
      console.error(err);
    }
    // setToken(token)
    localStorage.setItem("auth_token", token);
    validateToken(token);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      validateToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
