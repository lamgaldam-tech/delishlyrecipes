"use client";
import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function AuthPage() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || "Authentication failed");
      }

      const data = await res.json();

      if (!data.token) {
        throw new Error("Invalid server response");
      }

      login(data.token);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-gray-200 shadow-sm rounded-xl p-8">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          Admin Login
        </h1>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            disabled={isLoading}
          />

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-black text-white rounded-lg py-2.5 font-medium hover:bg-gray-900 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Authenticating...
              </>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
