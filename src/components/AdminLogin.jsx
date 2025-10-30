import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-lime-200 via-lime-100 to-white">
      <div className="w-full max-w-md p-8 bg-white/70 backdrop-blur-xl border border-lime-300 rounded-2xl shadow-2xl transition-all hover:shadow-lime-200">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-lime-700 mb-2">
            Admin Portal
          </h1>
          <p className="text-lime-700 text-sm">
            Sign in to manage users, licenses, and analytics
          </p>
        </div>

        <div className="mb-4 relative">
          <Mail className="absolute left-3 top-2.5 text-lime-500" size={20} />
          <input
            className="w-full border border-lime-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all"
            placeholder="Admin Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6 relative">
          <Lock className="absolute left-3 top-2.5 text-lime-500" size={20} />
          <input
            className="w-full border border-lime-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all"
            placeholder="Password"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => onLogin({ email })}
        >
          Sign In
        </button>

        <p className="text-xs text-center text-lime-700 mt-5">
          © {new Date().getFullYear()} Knocx Admin Console
        </p>
      </div>
    </div>
  );
}
