"use client";

import { useState } from "react";
import { Mail, Lock, User, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/lib/store";

export default function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const signIn = useAuthStore((s) => s.signIn);
  const signUp = useAuthStore((s) => s.signUp);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = mode === "signin" ? signIn(email, password) : signUp(name, email, password);
    if (!result.ok) {
      setError(result.error ?? "Something went wrong.");
      return;
    }
    setError(null);
  };

  return (
    <div className="max-w-md mx-auto px-5 py-16 md:py-24">
      <div className="text-center mb-10">
        <h1 className="font-display text-3xl md:text-4xl mb-3">
          {mode === "signin" ? "Welcome Back" : "Create Your Account"}
        </h1>
        <p className="text-charcoal/60 text-sm">
          {mode === "signin"
            ? "Sign in to view orders, your wishlist, and saved addresses."
            : "Join for early access to drops, restocks, and loyalty rewards."}
        </p>
      </div>

      <div className="flex rounded-full bg-cream p-1 mb-8">
        <button
          onClick={() => {
            setMode("signin");
            setError(null);
          }}
          className={`cursor-pointer flex-1 py-2.5 rounded-full text-sm font-semibold transition-colors ${
            mode === "signin" ? "bg-ink text-paper" : "text-charcoal/60 hover:text-ink"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => {
            setMode("signup");
            setError(null);
          }}
          className={`cursor-pointer flex-1 py-2.5 rounded-full text-sm font-semibold transition-colors ${
            mode === "signup" ? "bg-ink text-paper" : "text-charcoal/60 hover:text-ink"
          }`}
        >
          Create Account
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-line outline-none focus:border-gold transition-colors"
            />
          </div>
        )}
        <div className="relative">
          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-line outline-none focus:border-gold transition-colors"
          />
        </div>
        <div className="relative">
          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-line outline-none focus:border-gold transition-colors"
          />
        </div>

        {error && (
          <p className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle size={15} /> {error}
          </p>
        )}

        <button
          type="submit"
          className="cursor-pointer w-full py-3.5 rounded-full bg-ink text-paper font-semibold hover:bg-charcoal transition-colors"
        >
          {mode === "signin" ? "Sign In" : "Create Account"}
        </button>
      </form>

      <p className="text-center text-xs text-charcoal/50 mt-6">
        {mode === "signin" ? (
          <>
            New to ELKO?{" "}
            <button onClick={() => setMode("signup")} className="cursor-pointer font-semibold text-ink hover:text-gold transition-colors">
              Create an account
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button onClick={() => setMode("signin")} className="cursor-pointer font-semibold text-ink hover:text-gold transition-colors">
              Sign in
            </button>
          </>
        )}
      </p>
    </div>
  );
}
