"use client"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type AuthContextType = {
  token: string;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || "";
    setToken(storedToken);

    const targetPath = storedToken ? pathname : "/auth";

    if (pathname !== targetPath) {
      router.replace(targetPath);
      return;
    }

    setIsLoading(false);
  }, [pathname, router]);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    router.replace("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    router.replace("/auth");
  };

  const value: AuthContextType = {
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? (
        <div className="min-h-screen w-full bg-primary text-text-primary flex items-center justify-center px-4">
          <Loader2 className="animate-spin" size={24} />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
