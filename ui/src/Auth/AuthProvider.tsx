import { createContext, useState, useContext, SetStateAction } from "react";
import { ReactNode } from "react";

const AuthContext = createContext<{
  user: string | null;
  login: (userData: SetStateAction<string | null>) => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser !== null ? storedUser : null;
  });

  const login = (token: SetStateAction<string | null>) => {
    setUser(token);
    if (token !== null) {
      if (typeof token === "string") {
        sessionStorage.setItem("user", token);
      }
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
