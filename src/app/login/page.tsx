"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

interface StoredUser {
  fullName: string;
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const currentUser = localStorage.getItem("smartHireCurrentUser");
    if (currentUser) {
      setTimeout(() => router.replace("/u/dashboard"), 400);
    }
  }, [router]);

  const handleLogin = () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      const savedUsers = localStorage.getItem("smartHireUsers");
      const users: StoredUser[] = savedUsers ? JSON.parse(savedUsers) : [];
      const foundUser = users.find((user) => user.email === email.trim().toLowerCase());

      if (!foundUser) {
        setErrorMessage("No account found with this email. Please sign up first.");
        return;
      }
      if (foundUser.password !== password) {
        setErrorMessage("Invalid password. Please try again.");
        return;
      }

      const currentUser = {
        fullName: foundUser.fullName,
        email: foundUser.email,
      };
      localStorage.setItem("smartHireCurrentUser", JSON.stringify(currentUser));
      localStorage.setItem("smartHireLoginState", "true");
      setSuccessMessage("Login successful! Redirecting to your dashboard...");
      setTimeout(() => {
        router.push("/u/dashboard");
      }, 600);
    } catch (error) {
      setErrorMessage("Unable to log in right now. Please try again.");
      console.error(error);
    }
  };

  const handleGoogleLogin = () => {
    const googleUser = {
      fullName: "Google Hire",
      email: "google.user@smarthire.com",
    };
    localStorage.setItem("smartHireCurrentUser", JSON.stringify(googleUser));
    localStorage.setItem("smartHireLoginState", "true");
    setSuccessMessage("Google sign-in successful! Redirecting to dashboard...");
    setTimeout(() => router.push("/u/dashboard"), 600);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 px-4 py-10">
      <div className="mx-auto max-w-md rounded-3xl bg-white/95 p-8 shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Welcome back to SmartHire</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Sign in to manage resumes, rank candidates, and schedule interviews.
        </p>

        <div className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {errorMessage ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-200">
              {errorMessage}
            </div>
          ) : null}

          {successMessage ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-200">
              {successMessage}
            </div>
          ) : null}

          <Button className="w-full" onClick={handleLogin}>
            Login
          </Button>

          <div className="relative py-2 text-center text-sm text-slate-500">
            <span className="bg-white px-3 dark:bg-slate-900">or continue with</span>
          </div>

          <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
            Continue with Google
          </Button>

          <div className="pt-4 text-center text-sm text-slate-600 dark:text-slate-400">
            Don’t have an account?{' '}
            <Link href="/signup" className="font-semibold text-emerald-700 hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-100">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
